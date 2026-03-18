import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IyiOlusScreen = ({navigation}) => {
  const headerAnim  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const contentAnim  = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerAnim,  {toValue: 1, duration: 600, useNativeDriver: true}),
        Animated.spring(headerSlide, {toValue: 0, friction: 7,   useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(contentAnim,  {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.spring(contentSlide, {toValue: 0, friction: 8,   useNativeDriver: true}),
      ]),
    ]).start();
  }, []);

  const categories = [
    {
      id: 'Ruhsal',
      emoji: '🧠',
      title: 'Ruhsal İyi Oluş',
      desc: 'Duygusal denge ve zihinsel sağlık',
      color: '#c2185b',
      bg: '#fce4ec',
      border: '#f48fb1',
    },
    {
      id: 'Fiziksel',
      emoji: '🏃',
      title: 'Fiziksel İyi Oluş',
      desc: 'Beden sağlığı ve aktivite',
      color: '#ad1457',
      bg: '#fce4ec',
      border: '#f06292',
    },
    {
      id: 'StresAzaltma',
      emoji: '🌿',
      title: 'Stres Azaltma',
      desc: 'Rahatlama ve denge teknikleri',
      color: '#00796b',
      bg: '#e0f2f1',
      border: '#80cbc4',
      full: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header — NO logo, just gradient with back button and title */}
      <LinearGradient
        colors={['#6d1b7b', '#c2185b', '#e91e8c', '#ff5fa0']}
        style={styles.header}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}>

        {/* Decorative circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <Animated.View style={{opacity: headerAnim, transform: [{translateY: headerSlide}]}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <View style={styles.backBtnInner}>
              <Text style={styles.backBtnText}>← Geri</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>İyi Oluş</Text>
          <Text style={styles.headerSub}>DEĞERLENDİRMESİ</Text>
        </Animated.View>

        <View style={styles.wave} />
      </LinearGradient>

      {/* Content */}
      <Animated.View style={[styles.content, {opacity: contentAnim, transform: [{translateY: contentSlide}]}]}>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionIconWrap}>
            <Text style={styles.questionEmoji}>✅</Text>
          </View>
          <Text style={styles.questionText}>
            Ruhsal ya da fiziksel olarak daha iyi olmak ister misin?
          </Text>
        </View>

        <Text style={styles.fieldLabel}>BİR ALAN SEÇ</Text>

        {/* Top two cards */}
        <View style={styles.row}>
          {categories.filter(c => !c.full).map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.card, {backgroundColor: cat.bg, borderColor: cat.border}]}
              onPress={() => navigation.navigate(cat.id)}
              activeOpacity={0.82}>
              <View style={[styles.cardIconWrap, {borderColor: cat.border}]}>
                <Text style={styles.cardEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[styles.cardTitle, {color: cat.color}]}>{cat.title}</Text>
              <Text style={styles.cardDesc}>{cat.desc}</Text>
              <View style={[styles.cardArrowWrap, {backgroundColor: cat.color}]}>
                <Text style={styles.cardArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Full width card */}
        {categories.filter(c => c.full).map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.cardFull, {backgroundColor: cat.bg, borderColor: cat.border}]}
            onPress={() => navigation.navigate(cat.id)}
            activeOpacity={0.82}>
            <View style={styles.cardFullLeft}>
              <Text style={[styles.cardFullTitle, {color: cat.color}]}>{cat.title}</Text>
              <Text style={styles.cardFullDesc}>{cat.desc}</Text>
            </View>
            <Text style={styles.cardFullEmoji}>{cat.emoji}</Text>
            <View style={[styles.cardArrowWrap, {backgroundColor: cat.color}]}>
              <Text style={styles.cardArrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},

  header: {paddingTop: 52, paddingHorizontal: 24, paddingBottom: 52, overflow: 'hidden'},

  decorCircle1: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)', top: -50, right: -50,
  },
  decorCircle2: {
    position: 'absolute', width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: 10, left: -40,
  },

  backBtn: {marginBottom: 14},
  backBtnInner: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  backBtnText: {color: '#fff', fontSize: 13, fontWeight: '700'},

  pageTitle: {
    fontSize: 38, fontWeight: '900', color: '#fff',
    letterSpacing: 1, marginBottom: 2,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.65)', fontSize: 11,
    fontWeight: '800', letterSpacing: 3,
  },

  wave: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 28, backgroundColor: '#fafafa',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
  },

  content: {flex: 1, padding: 20, paddingTop: 16},

  questionCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderWidth: 1.5, borderColor: '#f48fb1', marginBottom: 24,
    shadowColor: '#c2185b', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
  },
  questionIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center',
  },
  questionEmoji: {fontSize: 20},
  questionText: {
    flex: 1, color: '#880e4f', fontSize: 14,
    lineHeight: 22, fontWeight: '600',
  },

  fieldLabel: {
    color: '#c2185b', fontSize: 11, fontWeight: '800',
    letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase',
  },

  row: {flexDirection: 'row', gap: 12, marginBottom: 12},
  card: {
    flex: 1, borderRadius: 22, borderWidth: 1.5, padding: 18, alignItems: 'center',
    shadowColor: '#c2185b', shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  cardIconWrap: {
    width: 58, height: 58, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1.5,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  cardEmoji: {fontSize: 28},
  cardTitle: {fontSize: 13, fontWeight: '800', textAlign: 'center', marginBottom: 5},
  cardDesc:  {color: '#aaa', fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 12},
  cardArrowWrap: {
    width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  cardArrowText: {color: '#fff', fontSize: 14, fontWeight: '900'},

  cardFull: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 22, borderWidth: 1.5, padding: 18, marginBottom: 28, gap: 12,
    shadowColor: '#00796b', shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  cardFullLeft:  {flex: 1},
  cardFullTitle: {fontSize: 15, fontWeight: '800', marginBottom: 4},
  cardFullDesc:  {color: '#aaa', fontSize: 12},
  cardFullEmoji: {fontSize: 36},

  footer: {
    color: '#ccc', textAlign: 'center', fontSize: 13,
    fontWeight: '700', marginTop: 'auto', paddingBottom: 8,
  },
});

export default IyiOlusScreen;