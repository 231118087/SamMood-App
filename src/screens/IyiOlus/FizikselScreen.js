import React, {useState, useRef, useEffect} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, ScrollView, Animated, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FIZIKSEL_SORULAR} from '../../data/mockData';
import {useApp} from '../../context/AppContext';

const FizikselScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const {addSurveyResult} = useApp();

  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim     = useRef(new Animated.Value(1)).current;
  const cardSlide    = useRef(new Animated.Value(0)).current;

  const current     = FIZIKSEL_SORULAR[currentIndex];
  const total       = FIZIKSEL_SORULAR.length;
  const progressPct = ((currentIndex + 1) / total) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {toValue: progressPct, duration: 400, useNativeDriver: false}).start();
  }, [currentIndex]);

  const animateTransition = cb => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(cardAnim,  {toValue: 0, duration: 150, useNativeDriver: true}),
        Animated.timing(cardSlide, {toValue: -20, duration: 150, useNativeDriver: true}),
      ]),
    ]).start(() => {
      cb();
      cardSlide.setValue(20);
      Animated.parallel([
        Animated.timing(cardAnim,  {toValue: 1, duration: 200, useNativeDriver: true}),
        Animated.spring(cardSlide, {toValue: 0, friction: 8, useNativeDriver: true}),
      ]).start();
    });
  };

  const handleNext = () => {
    if (!answers[current.id] && current.tip !== 'text') return;
    if (currentIndex < total - 1) {
      animateTransition(() => setCurrentIndex(i => i + 1));
    } else {
      addSurveyResult({anket: 'Fiziksel İyi Oluş', answers, tarih: new Date().toLocaleDateString('tr-TR')});
      navigation.navigate('Sonuc');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) animateTransition(() => setCurrentIndex(i => i - 1));
  };

  const progressWidth = progressAnim.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']});

  return (
    <SafeAreaView style={styles.container}>

      {/* Top nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Fiziksel İyi Oluş</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeBtn}>
          <Text style={styles.homeBtnText}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {width: progressWidth}]} />
        </View>
        <Text style={styles.progressLabel}>{currentIndex + 1} / {total}</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: cardAnim, transform: [{translateY: cardSlide}]}}>

          <View style={styles.stepRow}>
            {FIZIKSEL_SORULAR.map((_, i) => (
              <View key={i} style={[styles.stepDot, i < currentIndex && styles.stepDotDone, i === currentIndex && styles.stepDotActive]} />
            ))}
          </View>

          <View style={styles.questionCard}>
            <View style={styles.questionNumWrap}>
              <Text style={styles.questionNum}>Soru {currentIndex + 1}</Text>
            </View>
            <Text style={styles.questionText}>{current.soru}</Text>
          </View>

          <Text style={styles.fieldLabel}>
            {current.tip === 'text' ? 'CEVABINIZI GİRİN' : 'BİR SEÇENEK SEÇİN'}
          </Text>

          {current.tip === 'text' ? (
            <View style={styles.textInputCard}>
              <TextInput
                style={styles.textInput}
                placeholder={current.placeholder}
                placeholderTextColor="#f48fb1"
                value={answers[current.id] || ''}
                onChangeText={val => setAnswers({...answers, [current.id]: val})}
                keyboardType="numeric"
              />
            </View>
          ) : (
            current.secenekler.map((s, i) => {
              const isSelected = answers[current.id] === s;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => setAnswers({...answers, [current.id]: s})}
                  activeOpacity={0.8}>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{s}</Text>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <Text style={styles.radioCheck}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.navArea}>
        <TouchableOpacity
          style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
          onPress={handlePrev} disabled={currentIndex === 0} activeOpacity={0.8}>
          <Text style={[styles.navBtnText, currentIndex === 0 && styles.navBtnTextDisabled]}>← Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} activeOpacity={0.85} style={styles.nextBtnWrap}>
          <LinearGradient colors={['#c2185b', '#e91e8c', '#ff5fa0']} style={styles.nextBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
            <Text style={styles.nextBtnText}>{currentIndex === total - 1 ? 'TAMAMLA ✓' : 'Sonraki →'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},

  topNav: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10},
  backBtn: {backgroundColor: '#fce4ec', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8},
  backBtnText: {color: '#c2185b', fontSize: 13, fontWeight: '800'},
  pageTitle: {flex: 1, fontSize: 18, fontWeight: '900', color: '#880e4f', letterSpacing: 0.5},
  homeBtn: {width: 36, height: 36, borderRadius: 12, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  homeBtnText: {fontSize: 18},

  progressWrap: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, marginBottom: 8},
  progressTrack: {flex: 1, height: 6, backgroundColor: '#f8bbd0', borderRadius: 3, overflow: 'hidden'},
  progressFill: {height: 6, backgroundColor: '#c2185b', borderRadius: 3},
  progressLabel: {color: '#c2185b', fontSize: 12, fontWeight: '800', minWidth: 36, textAlign: 'right'},

  scroll: {flex: 1},
  scrollContent: {padding: 20, paddingTop: 8, paddingBottom: 20},

  stepRow: {flexDirection: 'row', gap: 4, marginBottom: 16, flexWrap: 'wrap'},
  stepDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#f8bbd0'},
  stepDotDone: {backgroundColor: '#f48fb1'},
  stepDotActive: {backgroundColor: '#c2185b', width: 20},

  questionCard: {backgroundColor: '#fff', borderRadius: 20, padding: 18, borderWidth: 1.5, borderColor: '#f8bbd0', marginBottom: 20, shadowColor: '#c2185b', shadowOpacity: 0.07, shadowRadius: 8, elevation: 2},
  questionNumWrap: {backgroundColor: '#fce4ec', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10},
  questionNum: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 1.5},
  questionText: {color: '#880e4f', fontSize: 15, lineHeight: 24, fontWeight: '600'},

  fieldLabel: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12},
  textInputCard: {backgroundColor: '#fff', borderRadius: 16, borderWidth: 1.5, borderColor: '#f8bbd0'},
  textInput: {color: '#111', fontSize: 16, fontWeight: '700', padding: 16},
  option: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: '#f8bbd0'},
  optionSelected: {backgroundColor: '#fce4ec', borderColor: '#c2185b'},
  optionText: {color: '#555', fontSize: 14, fontWeight: '600', flex: 1},
  optionTextSelected: {color: '#880e4f', fontWeight: '800'},
  radio: {width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#f8bbd0', justifyContent: 'center', alignItems: 'center'},
  radioSelected: {backgroundColor: '#c2185b', borderColor: '#c2185b'},
  radioCheck: {color: '#fff', fontSize: 13, fontWeight: '900'},

  navArea: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#fce4ec', backgroundColor: '#fff'},
  navBtn: {borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20, borderWidth: 1.5, borderColor: '#f8bbd0', backgroundColor: '#fff'},
  navBtnDisabled: {borderColor: '#f3f4f6', backgroundColor: '#fafafa'},
  navBtnText: {color: '#c2185b', fontSize: 14, fontWeight: '800'},
  navBtnTextDisabled: {color: '#ddd'},
  nextBtnWrap: {flex: 1, borderRadius: 14, overflow: 'hidden', shadowColor: '#c2185b', shadowOpacity: 0.3, shadowRadius: 8, elevation: 5},
  nextBtn: {paddingVertical: 16, alignItems: 'center'},
  nextBtnText: {color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 1},
});

export default FizikselScreen;