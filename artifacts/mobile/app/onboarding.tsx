import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: "1",
    smallTitle: "تنظيف احترافي",
    largeTitle: "لمنزلك",
    subtitle: "خدمات تنظيف منزلية احترافية لراحة بالك ولمعان منزلك",
    image: require("@/assets/images/illustration-sofa.png"),
    icon: "auto-fix",
  },
  {
    id: "2",
    smallTitle: "تنظيف المكاتب",
    largeTitle: "والمنشآت",
    subtitle: "بيئة عمل نظيفة ومنظمة تزيد من إنتاجية فريقك وتلهم الإبداع",
    image: require("@/assets/images/illustration-office.png"),
    icon: "office-building",
  },
  {
    id: "3",
    smallTitle: "احجز بسهولة",
    largeTitle: "في أي وقت",
    subtitle: "احجز خدمتك في ثوانٍ معدودة واختر الموعد الذي يناسب جدولك المزدحم",
    image: require("@/assets/images/illustration-bucket.png"),
    icon: "calendar-check",
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (activeIndex < ONBOARDING_DATA.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
    } else {
      router.replace("/(tabs)");
    }
  };

  const handlePrev = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (activeIndex > 0) {
      scrollRef.current?.scrollTo({ x: (activeIndex - 1) * width, animated: true });
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={[styles.skipText, { color: colors.primary }]}>تخطي</Text>
        </TouchableOpacity>
        <View style={styles.brandContainer}>
          <Text style={[styles.brandText, { color: colors.foreground }]}>نظافة</Text>
          <View style={[styles.homeIconContainer, { backgroundColor: colors.primary }]}>
            <Feather name="home" size={16} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {ONBOARDING_DATA.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              {/* Image Area with ARC */}
              <View style={[styles.imageArea, { backgroundColor: colors.primaryLight + "40" }]}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
              </View>

              {/* Text Content */}
              <View style={styles.contentContainer}>
                <View style={styles.titleRow}>
                  <Text style={[styles.smallTitle, { color: colors.mutedForeground }]}>{item.smallTitle}</Text>
                  <Text style={[styles.largeTitle, { color: colors.primary }]}>{item.largeTitle}</Text>
                </View>

                <View style={styles.descriptionRow}>
                  <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={18} color={colors.primary} />
                  </View>
                  <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{item.subtitle}</Text>
                </View>
              </View>

              {/* Pagination Dots */}
              <View style={styles.pagination}>
                {ONBOARDING_DATA.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: i === activeIndex ? colors.primary : colors.border },
                      i === activeIndex && styles.activeDot,
                    ]}
                  />
                ))}
              </View>

              {/* Navigation Buttons */}
              <View style={styles.footer}>
                {activeIndex > 0 ? (
                  <TouchableOpacity 
                    onPress={handlePrev} 
                    style={[styles.prevBtn, { borderColor: colors.border }]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.prevBtnText, { color: colors.mutedForeground }]}>السابق</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.prevBtnPlaceholder} />
                )}

                <TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.nextBtnContainer}>
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.nextBtn}
                  >
                    <Text style={styles.nextBtnText}>
                      {activeIndex === ONBOARDING_DATA.length - 1 ? "ابدأ الآن" : "التالي"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  skipText: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 16,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 20,
  },
  homeIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  imageArea: {
    height: 320,
    width: "100%",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "80%",
    height: "80%",
  },
  contentContainer: {
    padding: 24,
    alignItems: "flex-end",
  },
  titleRow: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  smallTitle: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 16,
    marginBottom: -4,
  },
  largeTitle: {
    fontFamily: "Cairo_700Bold",
    fontSize: 32,
  },
  descriptionRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  subtitle: {
    flex: 1,
    fontFamily: "Cairo_400Regular",
    fontSize: 15,
    textAlign: "right",
    lineHeight: 24,
  },
  pagination: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
    gap: 12,
  },
  prevBtn: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prevBtnText: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 16,
  },
  prevBtnPlaceholder: {
    flex: 1,
  },
  nextBtnContainer: {
    flex: 2,
  },
  nextBtn: {
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
  },
});
