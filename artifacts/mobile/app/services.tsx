import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { LinearGradient } from "expo-linear-gradient";

const CATEGORIES = [
  { id: "all", title: "الكل", icon: "grid", active: true },
  { id: "homes", title: "المنازل", icon: "home", active: false },
  { id: "offices", title: "المكاتب", icon: "briefcase", active: false },
  { id: "furniture", title: "الأثاث", icon: "package", active: false },
  { id: "others", title: "أخرى", icon: "more-horizontal", active: false },
];

const SERVICES_GRID = [
  { id: "1", title: "تنظيف منازل", price: "85", desc: "تنظيف دوري شامل للمنزل", image: require("@/assets/images/illustration-sofa.png"), color: "#16C47F" },
  { id: "2", title: "تنظيف عميق", price: "150", desc: "تنظيف تفصيلي دقيق لكل الزوايا", image: require("@/assets/images/illustration-vacuum.png"), color: "#2F80ED" },
  { id: "3", title: "تنظيف مكاتب", price: "100", desc: "بيئة عمل نظيفة ومنظمة", image: require("@/assets/images/illustration-office.png"), color: "#F59E0B" },
  { id: "4", title: "تنظيف كنب", price: "120", desc: "إزالة البقع والروائح الكريهة", image: require("@/assets/images/illustration-armchair.png"), color: "#EC4899" },
  { id: "5", title: "تنظيف مطابخ", price: "110", desc: "تعقيم وتنظيف الأجهزة والأسطح", image: require("@/assets/images/illustration-bucket.png"), color: "#8B5CF6" },
  { id: "6", title: "تنظيف فلل", price: "250", desc: "خدمة متكاملة للمساحات الكبيرة", image: require("@/assets/images/illustration-sofa.png"), color: "#16C47F" },
];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.iconCircle}>
          <Feather name="headphones" size={18} color={colors.foreground} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>خدماتنا</Text>
          <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>اختر الخدمة التي تناسب احتياجك</Text>
        </View>
        <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
          <Feather name="chevron-right" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Categories Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.categoryPill,
                { 
                  backgroundColor: activeCategory === cat.id ? colors.primary : colors.card,
                  borderColor: activeCategory === cat.id ? colors.primary : colors.border
                }
              ]}
            >
              <Text style={[styles.categoryText, { color: activeCategory === cat.id ? "#FFFFFF" : colors.foreground }]}>
                {cat.title}
              </Text>
              <Feather name={cat.icon as any} size={16} color={activeCategory === cat.id ? "#FFFFFF" : colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Services Grid */}
        <View style={styles.grid}>
          {SERVICES_GRID.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={[styles.serviceCard, { backgroundColor: colors.card }]}
              onPress={() => router.push("/booking")}
            >
              <View style={[styles.categoryIndicator, { backgroundColor: service.color + "20" }]}>
                 <View style={[styles.categoryIndicatorDot, { backgroundColor: service.color }]} />
              </View>
              
              <Image source={service.image} style={styles.serviceImage} resizeMode="contain" />
              
              <View style={styles.cardContent}>
                <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{service.title}</Text>
                <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]} numberOfLines={1}>
                  {service.desc}
                </Text>
                
                <View style={styles.cardFooter}>
                  <View style={[styles.arrowBtn, { backgroundColor: colors.primaryLight }]}>
                    <Feather name="arrow-left" size={14} color={colors.primary} />
                  </View>
                  <Text style={[styles.priceText, { color: colors.foreground }]}>
                    ابتداءً من <Text style={{ color: colors.primary, fontFamily: "Cairo_700Bold" }}>{service.price}</Text> رس
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Static Replica of Bottom Tab Bar */}
      <View style={[styles.tabBarReplica, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.tabItem}>
          <Feather name="user" size={24} color={colors.mutedForeground} />
          <Text style={[styles.tabLabel, { color: colors.mutedForeground }]}>الملف الشخصي</Text>
        </View>
        <View style={styles.tabItem}>
          <Feather name="calendar" size={24} color={colors.mutedForeground} />
          <Text style={[styles.tabLabel, { color: colors.mutedForeground }]}>حجوزاتي</Text>
        </View>
        
        <View style={styles.floatingBtnWrap}>
          <TouchableOpacity activeOpacity={0.9} style={[styles.floatingBtn]}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.floatingBtnGradient}
            >
              <MaterialCommunityIcons name="broom" size={28} color="#FFFFFF" />
            </LinearGradient>
            <Text style={[styles.tabLabel, { color: colors.mutedForeground, marginTop: 4 }]}>احجز الآن</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabItem}>
          <Feather name="message-circle" size={24} color={colors.mutedForeground} />
          <Text style={[styles.tabLabel, { color: colors.mutedForeground }]}>الرسائل</Text>
        </View>
        <View style={styles.tabItem}>
          <Feather name="home" size={24} color={colors.mutedForeground} />
          <Text style={[styles.tabLabel, { color: colors.mutedForeground }]}>الرئيسية</Text>
        </View>
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
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    gap: 8,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryText: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  serviceCard: {
    width: "48%",
    borderRadius: 24,
    overflow: "hidden",
    padding: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryIndicator: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  categoryIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  serviceImage: {
    width: "100%",
    height: 100,
    marginBottom: 12,
  },
  cardContent: {
    alignItems: "flex-end",
  },
  serviceTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 15,
    marginBottom: 4,
  },
  serviceDesc: {
    fontFamily: "Cairo_400Regular",
    fontSize: 11,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontFamily: "Cairo_500Medium",
    fontSize: 11,
  },
  tabBarReplica: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 0,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontFamily: "Cairo_500Medium",
    fontSize: 10,
    marginTop: 4,
  },
  floatingBtnWrap: {
    top: -20,
    alignItems: "center",
  },
  floatingBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  floatingBtnGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#16C47F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
