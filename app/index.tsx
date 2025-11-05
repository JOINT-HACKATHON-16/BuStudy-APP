import React from "react";
import { Pressable, View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import StyledBtn from "@/components/common/StyledBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";

const Index = () => {
  const backgroundColor = useThemeColor(
    { light: Colors.light.white, dark: Colors.dark.white },
    "background"
  );

  const grayColor = useThemeColor(
    { light: Colors.light.gray5, dark: Colors.dark.gray5 },
    "text"
  );

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1  , backgroundColor: backgroundColor }}>
    <ThemedView
      type="Bright"
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <View style={{ justifyContent: "center", alignItems: "center", gap: 20, marginTop:160 }}>
        <ThemedText type="Subtitle1">내 자투리 시간 투자</ThemedText>
        <View style={{ width: 100, height: 100, backgroundColor: "gray" }} />
      </View>
      <View style={{ position: "absolute", bottom: 40, width: "90%", alignItems:'center', gap:24 }}>
      <StyledBtn
        label="시작하기"
        isActive={true}
        style={{ width: "100%" }}
        onPress={() => {router.push("/(SignUp)")}}
      />
      <Pressable onPress={() => {router.push("/(Main)")}}>
      <ThemedText style={{color:grayColor}}>이미 계정이 있으신가요? 로그인하기</ThemedText>
      </Pressable>
      </View>
      
      
    </ThemedView>
    </SafeAreaView>
  );
};

export default Index;
