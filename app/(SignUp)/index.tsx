import CustomView from "@/components/common/CustomView";
import StyledBtn from "@/components/common/StyledBtn";
import StyledInput from "@/components/common/StyledInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRegisterStore } from "@/store/userInfo/useLoginStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const changeName = (text: string) => {
    setName(text);
  };
  const setRegisterName = useRegisterStore((state) => state.action.setName);

  return (
    <CustomView
      onPressLeftIcon={() => {
        router.back();
      }}
      themeType="Bright"
    >
      <ThemedView
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
        type="Bright"
      >
        <View style={{ width: "100%", alignItems: "stretch", gap: 32 }}>
          <ThemedText type="Subtitle1">이름을 입력해주세요</ThemedText>
          <View style={{ gap: 8 }}>
            <ThemedText style={{marginLeft:4}}>이름</ThemedText>
            <StyledInput
              placeholder="이름을 입력해주세요"
              style={{ width: "100%" }}
              value={name}
              onChangeText={changeName}
            />
          </View>
        </View>

        <StyledBtn
          label="다음"
          onPress={() => {
            router.push("/(SignUp)/idSetting");
            setRegisterName(name);
          }}
          isActive={name.length > 0}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            gap: 12,
          }}
        />
      </ThemedView>
    </CustomView>
  );
};

export default SignUp;
