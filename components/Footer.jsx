import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import FooterComponent from "./FooterComponent";
NativeWindStyleSheet.setOutput({
  default: "native",
});
function Footer() {
  return (
    <>
      <View>
        <View style={{ position: "fixed", left: 0, right: 0, bottom: 0 }}>
          <FooterComponent/>
        </View>
      </View>
    </>
  );
}
export default Footer;