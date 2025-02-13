import React, { useRef } from "react";
import { View, Text, Button, Image, Platform } from "react-native";
import { captureRef } from "react-native-view-shot";
import html2canvas from "html2canvas";

const imageUrl =
  "http://localhost:3000/proxy-image";
const App = () => {
  const viewRef = useRef(null);
  const captureScreenshot = async () => {
    try {
      if (Platform.OS === "web") {
        if (viewRef.current) {
          const element = document.getElementById("captureView");
          if (element) {
            const canvas = await html2canvas(element, {
              useCORS: true,
              allowTaint: true,
            });
            const image = canvas.toDataURL("image/png");
            console.log(image);
          } else {
            console.error("Element not found for capturing screenshot.");
          }
        }
      } else {
        const image = await captureRef(viewRef, {
          format: "png",
          quality: 1,
        });
        console.log(image);
      }
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fde4e4",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Banner */}
      <View
        style={{
          backgroundColor: "#ff6699",
          width: "100%",
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Happy Birthday
        </Text>
      </View>

      {/* Capturable View */}
      <View
        id="captureView"
        ref={viewRef}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          alignItems: "center",
          borderWidth: 5,
          borderColor: "#ff6699",
          marginVertical: 20,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 18, color: "#333", fontWeight: "bold" }}>
          On your special day, I wish you all the happiness,
        </Text>
        <Text style={{ fontSize: 18, color: "#333", fontWeight: "bold" }}>
          success, and fulfillment your heart can hold.
        </Text>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 300, height: 200, marginVertical: 10, borderRadius: 10 }}
        />
      </View>

      {/* Footer */}
      <View
        style={{
          backgroundColor: "#000066",
          width: "100%",
          padding: 15,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Somaskaher Rao and Family</Text>
        <View
          style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 12 }}>📷 Make your card</Text>
        </View>
      </View>

      {/* Capture Button */}
      <Button title="Capture Screenshot" onPress={captureScreenshot} />
    </View>
  );
};

export default App;
