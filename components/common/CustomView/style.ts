import styled from "styled-components/native";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeView = styled(SafeAreaView)`
    flex:1;
`
export const Container = styled(ThemedView)`
    flex:1;
    padding: 0 32px 40px 32px;
`