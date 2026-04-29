-- Migration v2: Add missing columns to providers table
-- Run this in your Supabase SQL editor

-- Add services and areas text arrays to providers
ALTER TABLE providers ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}';
ALTER TABLE providers ADD COLUMN IF NOT EXISTS areas text[] DEFAULT '{}';

-- Add address column to addresses (full address string)  
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS address text;

-- Add 'rejected' to provider_status_t enum if not exists
DO $$
BEGIN
  ALTER TYPE provider_status_t ADD VALUE IF NOT EXISTS 'rejected';
EXCEPTION WHEN others THEN NULL;
END$$;

-- Add payout_requested policy for admin notifications
DROP POLICY IF EXISTS "admin read notifications" ON notifications;
CREATE POLICY "admin read notifications" ON notifications
  FOR SELECT USING (public.is_admin() OR auth.uid() = user_id);
