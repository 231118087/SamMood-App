import React, {useState, useRef, useEffect} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Switch, ScrollView, Alert, Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useApp} from '../../context/AppContext';

const LoginScreen = ({navigation}) => {
  const [studentNo, setStudentNo] = useState('');
  const [isUnder25, setIsUnder25] = useState(true);
  const [isMale, setIsMale] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const {login} = useApp();
  const inputRef = useRef(null);

  const titleAnim  = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(-30)).current;
  const cardAnim   = useRef(new Animated.Value(0)).current;
  const cardSlide  = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleAnim,  {toValue: 1, duration: 700, useNativeDriver: true}),
        Animated.spring(titleSlide, {toValue: 0, friction: 7,   useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(cardAnim,  {toValue: 1, duration: 600, useNativeDriver: true}),
        Animated.spring(cardSlide, {toValue: 0, friction: 8,   useNativeDriver: true}),
      ]),
    ]).start();
  }, []);

  // ✅ Sadece rakam kabul et — çok katmanlı filtre
  const handleStudentNoChange = (text) => {
    // Tüm rakam dışı karakterleri (harf, özel karakter, boşluk) sil
    const onlyNumbers = text.replace(/\D/g, '');
    // Maksimum 3 karakter
    setStudentNo(onlyNumbers.slice(0, 3));
  };

  const handleLogin = () => {
    if (!studentNo || studentNo.length < 3) {
      Alert.alert('Hata', 'Lütfen öğrenci numaranızın son 3 hanesini giriniz.');
      return;
    }
    login(studentNo, isUnder25 ? '-25' : '25+', isMale ? 'Erkek' : 'Kadın');
    navigation.replace('Main');
  };

  const handleKVKK = () => {
    Alert.alert(
      'KVKK Aydınlatma Metni',
      'Samsun Üniversitesi SAMMOOD uygulaması kapsamında toplanan veriler anonim olarak işlenmekte ve yalnızca akademik araştırma amacıyla kullanılmaktadır.\n\nKişisel verileriniz üçüncü şahıslarla paylaşılmamaktadır.',
      [{text: 'Anladım'}],
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6d1b7b', '#c2185b', '#e91e8c', '#ff5fa0']}
        style={styles.header}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}>

        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <Animated.View style={{opacity: titleAnim, transform: [{translateY: titleSlide}]}}>
          <View style={styles.titleRow}>
            <Text style={styles.samText}>SAM</Text>
            <Text style={styles.moodText}>MOOD</Text>
          </View>
          <Text style={styles.tagline}>Samsun Üniversitesi © 2025</Text>
        </Animated.View>
        <View style={styles.wave} />
      </LinearGradient>

      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled">
        <Animated.View style={{opacity: cardAnim, transform: [{translateY: cardSlide}]}}>

          {showInfo && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Bu uygulama anonimdir. Numaranızın yalnızca son 3 hanesi kullanılır.
              </Text>
            </View>
          )}

          <Text style={styles.fieldLabel}>ÖĞRENCİ NUMARASI</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => inputRef.current?.focus()}
            activeOpacity={0.95}>
            <Text style={styles.cardIcon}>🎓</Text>
            <TextInput
              ref={inputRef}
              style={styles.cardInput}
              value={studentNo}
              onChangeText={handleStudentNoChange}
              keyboardType="number-pad"
              maxLength={3}
              contextMenuHidden={true}
              caretHidden={false}
              autoCorrect={false}
              autoComplete="off"
              placeholder="Son 3 haneyi girin"
              placeholderTextColor="#f48fb1"
            />
            <TouchableOpacity
              onPress={() => setShowInfo(!showInfo)}
              style={styles.infoBtn}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <Text style={styles.infoBtnText}>i</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.fieldLabel}>YAŞ GRUBU</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{isUnder25 ? '25 yaş altı' : '25 yaş üzeri'}</Text>
            <Text style={[styles.switchTag, !isUnder25 && styles.switchTagActive]}>25+</Text>
            <Switch
              value={isUnder25}
              onValueChange={setIsUnder25}
              trackColor={{false: '#f48fb1', true: '#c2185b'}}
              thumbColor="#fff"
            />
            <Text style={[styles.switchTag, isUnder25 && styles.switchTagActive]}>-25</Text>
          </View>

          <Text style={styles.fieldLabel}>CİNSİYET</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderCard, isMale && styles.genderCardMale]}
              onPress={() => setIsMale(true)}
              activeOpacity={0.8}>
              <Text style={[styles.genderSymbol, isMale && styles.genderSymbolMale]}>♂</Text>
              <Text style={[styles.genderLabel, isMale && styles.genderLabelMale]}>Erkek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderCard, !isMale && styles.genderCardFemale]}
              onPress={() => setIsMale(false)}
              activeOpacity={0.8}>
              <Text style={[styles.genderSymbol, !isMale && styles.genderSymbolFemale]}>♀</Text>
              <Text style={[styles.genderLabel, !isMale && styles.genderLabelFemale]}>Kadın</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleKVKK} style={styles.kvkkRow} activeOpacity={0.7}>
            <View style={styles.kvkkCheck}>
              <Text style={styles.kvkkCheckText}>✓</Text>
            </View>
            <Text style={styles.kvkkText}>KVKK Aydınlatma Metnini okudum, onaylıyorum</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.85} style={styles.loginWrap}>
            <LinearGradient
              colors={['#c2185b', '#e91e8c', '#ff5fa0']}
              style={styles.loginBtn}
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              <Text style={styles.loginText}>GİRİŞ YAP →</Text>
            </LinearGradient>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},

  header: {paddingTop: 72, paddingHorizontal: 28, paddingBottom: 60, overflow: 'hidden'},
  decorCircle1: {position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.07)', top: -60, right: -60},
  decorCircle2: {position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.05)', bottom: 20, left: -40},

  titleRow: {flexDirection: 'row', alignItems: 'baseline', marginBottom: 6},
  samText:  {fontSize: 58, fontWeight: '900', color: 'rgba(255,255,255,0.38)', letterSpacing: 2},
  moodText: {fontSize: 58, fontWeight: '900', color: '#fff', letterSpacing: 2},
  tagline:  {color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '700', letterSpacing: 1},

  wave: {position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, backgroundColor: '#fafafa', borderTopLeftRadius: 32, borderTopRightRadius: 32},

  formScroll: {flex: 1, backgroundColor: '#fafafa'},
  formContent: {padding: 22, paddingTop: 16, paddingBottom: 36},

  infoBox: {backgroundColor: '#fce4ec', borderRadius: 14, padding: 14, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: '#c2185b'},
  infoText: {color: '#880e4f', fontSize: 13, lineHeight: 20},

  fieldLabel: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 8, marginTop: 4},

  card: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1.5, borderColor: '#f8bbd0', shadowColor: '#c2185b', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  cardIcon: {fontSize: 22, marginRight: 12},
  cardInput: {flex: 1, color: '#880e4f', fontSize: 18, fontWeight: '800'},
  cardText:  {flex: 1, color: '#333', fontSize: 15, fontWeight: '600'},

  infoBtn: {width: 28, height: 28, borderRadius: 14, backgroundColor: '#c2185b', justifyContent: 'center', alignItems: 'center'},
  infoBtnText: {color: '#fff', fontSize: 13, fontWeight: '900'},

  switchTag:       {color: '#f48fb1', fontSize: 14, fontWeight: '700', marginHorizontal: 5},
  switchTagActive: {color: '#c2185b', fontWeight: '900'},

  genderRow: {flexDirection: 'row', gap: 12, marginBottom: 16},
  genderCard: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1.5, borderColor: '#f8bbd0'},
  genderCardMale:   {backgroundColor: '#e3f2fd', borderColor: '#90caf9'},
  genderCardFemale: {backgroundColor: '#fce4ec', borderColor: '#f48fb1'},
  genderSymbol:        {fontSize: 22, color: '#ddd'},
  genderSymbolMale:    {color: '#1565c0'},
  genderSymbolFemale:  {color: '#c2185b'},
  genderLabel:         {fontSize: 15, fontWeight: '700', color: '#ccc'},
  genderLabelMale:     {color: '#1565c0'},
  genderLabelFemale:   {color: '#c2185b'},

  kvkkRow:  {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20, paddingHorizontal: 4},
  kvkkCheck: {width: 20, height: 20, borderRadius: 6, backgroundColor: '#fce4ec', borderWidth: 1.5, borderColor: '#f48fb1', justifyContent: 'center', alignItems: 'center'},
  kvkkCheckText: {color: '#c2185b', fontSize: 12, fontWeight: '900'},
  kvkkText: {flex: 1, color: '#aaa', fontSize: 12, lineHeight: 18},

  loginWrap: {borderRadius: 18, overflow: 'hidden', shadowColor: '#c2185b', shadowOpacity: 0.35, shadowRadius: 10, elevation: 6},
  loginBtn:  {paddingVertical: 18, alignItems: 'center'},
  loginText: {color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 2},
});

export default LoginScreen;