import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { LinearGradient } from "expo-linear-gradient";

const STEPS = [
  { id: 1, title: "الخدمة", status: "completed" },
  { id: 2, title: "التفاصيل", status: "completed" },
  { id: 3, title: "الموعد", status: "completed" },
  { id: 4, title: "تأكيد", status: "active" },
];

const DATES = [
  { day: "التلاثاء", num: "21", month: "مايو" },
  { day: "الأربعاء", num: "22", month: "مايو" },
  { day: "الخميس", num: "23", month: "مايو", selected: true },
  { day: "الجمعة", num: "24", month: "مايو" },
  { day: "السبت", num: "25", month: "مايو" },
];

const TIMES = [
  { label: "صباحاً", range: "08:00-10:00" },
  { label: "صباحاً", range: "10:00-12:00", selected: true },
  { label: "ظهراً", range: "12:00-02:00" },
  { label: "عصراً", range: "04:00-06:00" },
  { label: "مساء", range: "06:00-08:00" },
];

const CLEANERS = [
  { id: "1", name: "أحمد حسين", rating: "4.9", exp: "5", image: require("@/assets/images/cleaner-fatima.png"), selected: true },
  { id: "2", name: "سارة علي", rating: "4.8", exp: "3", image: require("@/assets/images/cleaner-sara.png") },
  { id: "3", name: "نورة محمد", rating: "4.7", exp: "4", image: require("@/assets/images/cleaner-noura.png") },
];

export default function BookingScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>إتمام الحجز</Text>
          <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>راجع تفاصيل الحجز وأكد الطلب</Text>
        </View>
        <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
          <Feather name="chevron-right" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Stepper */}
        <View style={styles.stepperContainer}>
          {STEPS.reverse().map((step, index) => (
            <React.Fragment key={step.id}>
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepCircle,
                  { 
                    backgroundColor: step.status === "completed" ? colors.primary : step.status === "active" ? colors.accent : colors.border,
                    borderColor: step.status === "active" ? colors.accentLight : "transparent",
                    borderWidth: step.status === "active" ? 4 : 0
                  }
                ]}>
                  {step.status === "completed" ? (
                    <Feather name="check" size={14} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.stepNumber}>{step.id}</Text>
                  )}
                </View>
                <Text style={[styles.stepTitle, { color: step.status === "active" ? colors.foreground : colors.mutedForeground }]}>
                  {step.title}
                </Text>
              </View>
              {index < STEPS.length - 1 && (
                <View style={[styles.stepLine, { backgroundColor: step.status === "completed" ? colors.primary : colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.sectionHeader}>
          <Feather name="calendar" size={18} color={colors.foreground} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>اختر التاريخ</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {DATES.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCard,
                { 
                  backgroundColor: date.selected ? colors.primary : colors.card,
                  borderColor: date.selected ? colors.primary : colors.border
                }
              ]}
            >
              <Text style={[styles.dateDay, { color: date.selected ? "#FFFFFF" : colors.mutedForeground }]}>{date.day}</Text>
              <Text style={[styles.dateNum, { color: date.selected ? "#FFFFFF" : colors.foreground }]}>{date.num}</Text>
              <Text style={[styles.dateMonth, { color: date.selected ? "#FFFFFF" : colors.mutedForeground }]}>{date.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Selection */}
        <View style={styles.sectionHeader}>
          <Feather name="clock" size={18} color={colors.foreground} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>اختر الوقت</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {TIMES.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeCard,
                { 
                  backgroundColor: time.selected ? colors.primary : colors.card,
                  borderColor: time.selected ? colors.primary : colors.border
                }
              ]}
            >
              <Text style={[styles.timeLabel, { color: time.selected ? "#FFFFFF" : colors.mutedForeground }]}>{time.label}</Text>
              <Text style={[styles.timeRange, { color: time.selected ? "#FFFFFF" : colors.foreground }]}>{time.range}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cleaner Selection */}
        <View style={styles.sectionHeader}>
          <Feather name="user" size={18} color={colors.foreground} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>اختر عامل النظافة</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {CLEANERS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.cleanerCard, 
                { 
                  backgroundColor: colors.card,
                  borderColor: item.selected ? colors.primary : "transparent",
                  borderWidth: item.selected ? 2 : 0
                }
              ]}
            >
              <Image source={item.image} style={styles.cleanerAvatar} />
              <Text style={[styles.cleanerName, { color: colors.foreground }]}>{item.name}</Text>
              <View style={styles.ratingRow}>
                <Text style={[styles.ratingText, { color: colors.foreground }]}>{item.rating}</Text>
                <MaterialCommunityIcons name="star" size={14} color={colors.warning} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Order Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryHeader, { color: colors.foreground }]}>ملخص الطلب</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>تنظيف عميق للمنزل</Text>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>الخدمة</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>الخميس، 23 مايو 2024</Text>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>التاريخ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>10:00 ص - 12:00 م</Text>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>الوقت</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>أحمد حسين</Text>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>عامل النظافة</Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.priceRow}>
            <Text style={[styles.priceValue, { color: colors.foreground }]}>70 رس</Text>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>السعر الأساسي</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceValue, { color: colors.foreground }]}>10 رس</Text>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>رسوم الخدمة</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceValue, { color: colors.foreground }]}>12 رس</Text>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>ضريبة القيمة المضافة (15%)</Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.totalRow}>
            <Text style={[styles.totalValue, { color: colors.primary }]}>92 ر.س</Text>
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>الإجمالي</Text>
          </View>
        </View>

        {/* Payment Method */}
        <TouchableOpacity style={[styles.paymentRow, { backgroundColor: colors.card }]}>
          <Feather name="chevron-left" size={20} color={colors.mutedForeground} />
          <View style={styles.paymentInfo}>
             <Text style={[styles.paymentText, { color: colors.foreground }]}>visa **** 4242</Text>
             <MaterialCommunityIcons name="credit-card" size={20} color={colors.accent} />
          </View>
          <Text style={[styles.paymentLabel, { color: colors.mutedForeground }]}>طريقة الدفع</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push("/payment")}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmBtn}
          >
            <Feather name="lock" size={18} color="#FFFFFF" />
            <View style={styles.confirmTextContainer}>
              <Text style={styles.confirmTitle}>تأكيد الحجز</Text>
              <Text style={styles.confirmSubtitle}>92 ر.س | الإجمالي</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  headerTitleContainer: {
    alignItems: "flex-end",
  },
  headerTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 18,
  },
  headerSubtitle: {
    fontFamily: "Cairo_400Regular",
    fontSize: 13,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  stepItem: {
    alignItems: "center",
    width: 60,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepNumber: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 12,
  },
  stepTitle: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 10,
  },
  stepLine: {
    height: 2,
    flex: 1,
    marginTop: -16,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  dateCard: {
    width: 70,
    height: 90,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  dateDay: {
    fontFamily: "Cairo_500Medium",
    fontSize: 12,
  },
  dateNum: {
    fontFamily: "Cairo_700Bold",
    fontSize: 18,
  },
  dateMonth: {
    fontFamily: "Cairo_400Regular",
    fontSize: 12,
  },
  timeCard: {
    width: 120,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  timeLabel: {
    fontFamily: "Cairo_500Medium",
    fontSize: 11,
  },
  timeRange: {
    fontFamily: "Cairo_700Bold",
    fontSize: 13,
  },
  cleanerCard: {
    width: 100,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cleanerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  cleanerName: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  ratingRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 11,
  },
  summaryCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryHeader: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "right",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: "Cairo_500Medium",
    fontSize: 13,
  },
  summaryValue: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontFamily: "Cairo_400Regular",
    fontSize: 12,
  },
  priceValue: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  totalLabel: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
  },
  totalValue: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  paymentText: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
  },
  paymentLabel: {
    fontFamily: "Cairo_500Medium",
    fontSize: 13,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  confirmBtn: {
    height: 64,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  confirmTextContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  confirmTitle: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
  },
  confirmSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Cairo_500Medium",
    fontSize: 12,
  },
});
