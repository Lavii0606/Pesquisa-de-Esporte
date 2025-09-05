import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

function MeuBotao({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#8B2F00" : "#a3540f",
          opacity: pressed ? 0.8 : 1,
        },
        styles.botao,
      ]}
    >
      <Text style={styles.textoBotao}>{title}</Text>
    </Pressable>
  );
}

export default function App() {
  const [nome, setNome] = useState("");
  const [img, setImg] = useState(null);
  const [erro, setErro] = useState(""); // estado para mensagem de erro
  const animHeight = useRef(new Animated.Value(0)).current;

  const trocaImagem = (x) => {
    const nomeLower = x.toLowerCase().trim();
    let novaImg = null;

    if (
      nomeLower === "volei" ||
      nomeLower === "voleibol" ||
      nomeLower === "vôlei"
    ) {
      novaImg = require("./imagem/volei.jpeg");
    } else if (nomeLower === "basquete") {
      novaImg = require("./imagem/Basquete.jpeg");
    } else if (nomeLower === "handebol") {
      novaImg = require("./imagem/handebol.jpg");
    } else if (nomeLower === "futebol" || nomeLower === "soccer") {
      novaImg = require("./imagem/futebol.jpeg");
    } else if (nomeLower === "hóquei" || nomeLower === "hoquei") {
      novaImg = require("./imagem/hóquei.png");
    } else if (
      nomeLower === "natação" ||
      nomeLower === "natacao" ||
      nomeLower === "nataçao"
    ) {
      novaImg = require("./imagem/natacao.jpg");
    }

    if (novaImg) {
      setImg(novaImg);
      setErro(""); // limpa erro se encontrar imagem
    } else {
      setImg(null);
      setErro("Imagem não encontrada! Digite novamente.");
    }

    Animated.timing(animHeight, {
      toValue: 320,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const limparPesquisa = () => {
    setNome("");
    setImg(null);
    setErro(""); // limpa erro ao limpar pesquisa
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("./imagem/fundo.jpg")}
        style={styles.fundo}
        resizeMode="cover"
        blurRadius={5}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.label}>Digite o esporte:</Text>

              <TextInput
                placeholder="Ex: Vôlei, Futebol, Natação..."
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <MeuBotao title="Pesquisar" onPress={() => trocaImagem(nome)} />

              {nome.length > 0 && (
                <Text style={styles.nomeLabel}>
                  Esporte Digitado:{" "}
                  <Text style={styles.nomeEstilizado}>{nome}</Text>
                </Text>
              )}

              <Animated.View
                style={[styles.imagemContainer, { height: animHeight }]}
              >
                {img ? (
                  <>
                    <Image source={img} style={styles.imagem} />
                    <MeuBotao
                      title="Limpar Pesquisa"
                      onPress={limparPesquisa}
                    />
                  </>
                ) : erro ? (
                  <View style={styles.erroContainer}>
                    <Text style={styles.erroTexto}>{erro}</Text>
                    <MeuBotao
                      title="Limpar Pesquisa"
                      onPress={limparPesquisa}
                    />
                  </View>
                ) : null}
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#c09071ff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },

  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  label: {
    fontSize: 24,
    color: "#ffc271ff",
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "Impact",
    letterSpacing: 2,
    textTransform: "uppercase",
    textShadowColor: "#a3540f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffb575ff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    backgroundColor: "#fff8f0",
    marginBottom: 15,
    color: "#4a2600",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  botao: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  textoBotao: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  nomeLabel: {
    fontSize: 20,
    color: "#ffbe74ff",
    fontFamily: "Verdana",
    marginBottom: 10,
  },

  nomeEstilizado: {
    color: "#ffd5b5ff",
    fontFamily: "Arial Black",
    fontSize: 20,
    letterSpacing: 1,
  },

  imagemContainer: {
    width: "100%",
    maxWidth: 480,
    maxHeight: 260,
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#a3540f",
    marginTop: 10,
  },

  imagem: {
    width: "100%",
    height: "80%",
    borderRadius: 16,
    resizeMode: "contain",
    alignSelf: "center",
  },

  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 50, 50, 0.2)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ff4d4d",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  erroTexto: {
    color: "#ff1a1a",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
});
