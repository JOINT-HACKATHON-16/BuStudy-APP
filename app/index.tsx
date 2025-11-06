import StyledBtn from "@/components/common/StyledBtn";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={{ flex: 1  , backgroundColor: backgroundColor, paddingHorizontal:32, }}>
    <ThemedView
      type="Bright"
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}
    >
      <View style={{ justifyContent: "center", alignItems: "flex-start", gap: 8, marginTop:140 }}>
        <ThemedText type="Subtitle4" style={{color: Colors.light.primary50}}>{"버스 안에서 배우는 새로운 학습 경험"}</ThemedText>
        <ThemedText type="Heavy" style={{color: Colors.light.primary60}}>BuStudy</ThemedText>
      </View>
      <Image source={{ uri : 'https://cdn.discordapp.com/attachments/1435459558939037908/1435788809420673034/kpass_bus.png?ex=690d3e07&is=690bec87&hm=0d89ef63a4b3f31f0d1d0b4a64e2870a2f3c3a588c7053b31b26333d30d3349b&'}} style={{ width:400, height:400, resizeMode: 'contain', left:80, bottom:100, position:'absolute'}} />
      <View style={{ position: "absolute", bottom: 40, width: "100%", alignItems:'center', gap:24 }}>
      <StyledBtn
        label="시작하기"
        isActive={true}
        style={{width:'100%'}}
        onPress={() => {router.push("/(SignUp)")}}
      />
      <Pressable onPress={() => {router.push("/(Login)")}}>
      <View style={{flexDirection:'row', gap:4}}>
       <ThemedText style={{color:grayColor}} type="Body4">이미 계정이 있으신가요?</ThemedText>
      <ThemedText style={{color:grayColor, textDecorationLine:'underline'}} type="Body3">로그인 하기</ThemedText>
      </View>
     
      </Pressable>
      </View>
      
      
    </ThemedView>
    </SafeAreaView>
  );
};

export default Index;
