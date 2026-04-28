import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { LinearGradient } from "expo-linear-gradient";

const FILTERS = [
  { id: "all", title: "الكل", icon: "star", active: true },
  { id: "seasonal", title: "عروض موسمية", icon: "weather-sunny", active: false },
  { id: "discounts", title: "خصومات", icon: "percent", active: false },
  { id: "referral", title: "دعوة الأصدقاء", icon: "account-group", active: false },
];

const SEASONAL_OFFERS = [
  { id: "1", title: "عرض العيد", discount: "25%", desc: "على جميع خدمات التنظيف", timer: "05:18:32", icon: "moon-waning-crescent", color: "#F59E0B" },
  { id: "2", title: "تنظيف الربيع", discount: "20%", desc: "للتنظيف العميق", timer: "08:21:47", icon: "flower", color: "#16C47F" },
  { id: "3", title: "استعد للصيف", discount: "15%", desc: "على تنظيف المكيفات", timer: "10:15:30", icon: "air-conditioner", color: "#2F80ED" },
];

export default function OffersScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.iconCircle}>
          <Feather name="bell" size={20} color={colors.foreground} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>العروض والخصومات</Text>
          <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>عروض حصرية عليك لا تفوتها!</Text>
        </View>
        <TouchableOpacity style={styles.iconCircle}>
          <Feather name="gift" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Filters Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {FILTERS.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveFilter(cat.id)}
              style={[
                styles.filterPill,
                activeFilter === cat.id && { borderColor: "transparent" }
              ]}
            >
              {activeFilter === cat.id ? (
                <LinearGradient
                  colors={[colors.accent, colors.accentDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              ) : (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} />
              )}
              <Text style={[styles.filterText, { color: activeFilter === cat.id ? "#FFFFFF" : colors.foreground }]}>
                {cat.title}
              </Text>
              <MaterialCommunityIcons name={cat.icon as any} size={16} color={activeFilter === cat.id ? "#FFFFFF" : colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Promo Card */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={[colors.accent, colors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroContent}>
              <View style={[styles.heroBadge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                 <Text style={styles.heroBadgeText}>خصم حتى 30%</Text>
              </View>
              <Text style={styles.heroTitle}>عرض خاص على تنظيف المنازل</Text>
              <Text style={styles.heroBody}>
                للفترة محدودة! احجز الآن واستفد من خصم يصل إلى 30% على جميع خدمات تنظيف المنازل.
              </Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={[styles.heroBtnText, { color: colors.accent }]}>احجز الآن</Text>
              </TouchableOpacity>
            </View>
            <Image source={require("@/assets/images/illustration-bucket.png")} style={styles.heroImage} />
          </LinearGradient>
          <View style={styles.paginationDots}>
             <View style={[styles.pageDot, { backgroundColor: colors.border }]} />
             <View style={[styles.pageDot, { backgroundColor: colors.accent, width: 24 }]} />
             <View style={[styles.pageDot, { backgroundColor: colors.border }]} />
          </View>
        </View>

        {/* Seasonal Offers */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>عروض موسمية</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {SEASONAL_OFFERS.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.seasonalCard, { backgroundColor: colors.card }]}>
              <View style={[styles.seasonalIconBox, { backgroundColor: item.color + "20" }]}>
                 <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={[styles.seasonalOfferTitle, { color: colors.foreground }]}>{item.title}</Text>
              <Text style={[styles.seasonalDiscount, { color: colors.danger }]}>خصم {item.discount}</Text>
              <Text style={[styles.seasonalDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
              
              <View style={[styles.timerBox, { backgroundColor: colors.secondary }]}>
                 <Feather name="clock" size={12} color={colors.danger} />
                 <Text style={[styles.timerText, { color: colors.danger }]}>ينتهي خلال {item.timer}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Referral Card */}
        <View style={[styles.referralCard, { backgroundColor: colors.accentLight }]}>
          <View style={styles.referralContent}>
             <Text style={[styles.referralTitle, { color: colors.accentDark }]}>ادع أصدقائك واحصل على مكافآت!</Text>
             <Text style={[styles.referralBody, { color: colors.mutedForeground }]}>
                احصل على 50 ر.س رصيد مجاني لكل صديق يسجل ويحجز عبر كود الدعوة الخاص بك.
             </Text>
             <TouchableOpacity style={[styles.referralBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.referralBtnText}>دعوة الأصدقاء</Text>
             </TouchableOpacity>
             <View style={styles.codeRow}>
                <Feather name="copy" size={16} color={colors.mutedForeground} />
                <Text style={[styles.codeText, { color: colors.foreground }]}>كود الدعوة <Text style={{ fontFamily: "Cairo_700Bold" }}>CLEAN30</Text></Text>
             </View>
          </View>
          <Image source={require("@/assets/images/illustration-referral.png")} style={styles.referralImage} />
        </View>

        {/* Discounts Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>خصومات مميزة</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity style={[styles.compactCard, { backgroundColor: colors.card }]}>
             <View style={[styles.compactIcon, { backgroundColor: colors.successLight }]}>
                <MaterialCommunityIcons name="medal" size={24} color={colors.success} />
             </View>
             <Text style={[styles.compactTitle, { color: colors.foreground }]}>خصم العملاء الدائمين</Text>
             <Text style={[styles.compactBody, { color: colors.mutedForeground }]}>خصم 10% على كل 5 طلبات متتالية</Text>
             <Text style={[styles.moreText, { color: colors.success }]}>المزيد</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.compactCard, { backgroundColor: colors.card }]}>
             <View style={[styles.compactIcon, { backgroundColor: colors.accentLight }]}>
                <MaterialCommunityIcons name="crown" size={24} color={colors.accent} />
             </View>
             <Text style={[styles.compactTitle, { color: colors.foreground }]}>اشتراك شهري</Text>
             <Text style={[styles.compactBody, { color: colors.mutedForeground }]}>خصم يصل إلى 35% على الاشتراكات</Text>
             <Text style={[styles.moreText, { color: colors.accent }]}>المزيد</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.compactCard, { backgroundColor: colors.card }]}>
             <View style={[styles.compactIcon, { backgroundColor: "#FFEDD5" }]}>
                <MaterialCommunityIcons name="office-building" size={24} color="#FB923C" />
             </View>
             <Text style={[styles.compactTitle, { color: colors.foreground }]}>للشركات</Text>
             <Text style={[styles.compactBody, { color: colors.mutedForeground }]}>عروض خاصة للشركات والمكاتب</Text>
             <Text style={[styles.moreText, { color: "#FB923C" }]}>المزيد</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
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
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 18,
  },
  headerSubtitle: {
    fontFamily: "Cairo_400Regular",
    fontSize: 13,
  },
  filtersScroll: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
    paddingVertical: 4,
  },
  filterPill: {
    width: 130,
    height: 44,
    borderRadius: 100,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterText: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 13,
  },
  heroWrap: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  heroCard: {
    borderRadius: 32,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  heroContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 10,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 20,
    textAlign: "right",
    marginBottom: 8,
  },
  heroBody: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Cairo_400Regular",
    fontSize: 12,
    textAlign: "right",
    lineHeight: 18,
    marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
  },
  heroBtnText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 12,
  },
  heroImage: {
    width: 100,
    height: 100,
    marginLeft: 12,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 18,
  },
  seeAll: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  seasonalCard: {
    width: 160,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  seasonalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  seasonalOfferTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 15,
    marginBottom: 4,
  },
  seasonalDiscount: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    marginBottom: 4,
  },
  seasonalDesc: {
    fontFamily: "Cairo_400Regular",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 16,
  },
  timerBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 6,
  },
  timerText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 10,
  },
  referralCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    overflow: "hidden",
  },
  referralContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  referralTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    textAlign: "right",
    marginBottom: 8,
  },
  referralBody: {
    fontFamily: "Cairo_400Regular",
    fontSize: 12,
    textAlign: "right",
    lineHeight: 18,
    marginBottom: 16,
  },
  referralBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 12,
  },
  referralBtnText: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 13,
  },
  codeRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  codeText: {
    fontFamily: "Cairo_500Medium",
    fontSize: 12,
  },
  referralImage: {
    width: 100,
    height: 100,
    marginLeft: 12,
  },
  compactCard: {
    width: 160,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  compactIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  compactTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  compactBody: {
    fontFamily: "Cairo_400Regular",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 16,
  },
  moreText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 12,
  },
});
