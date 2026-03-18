import React, {useState, useEffect, useRef} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, Alert, Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useApp} from '../../context/AppContext';
import {MOODS} from '../../data/mockData';

const HomeScreen = ({navigation}) => {
  const {selectMood, xp, streak, levelInfo, lastBadge, earnedBadges, BADGES} = useApp();
  const [seconds, setSeconds] = useState(12452);
  const [selectedMood, setSelectedMood] = useState(null);
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  {toValue: 1, duration: 600, useNativeDriver: true}),
      Animated.spring(slideAnim, {toValue: 0, friction: 8,   useNativeDriver: true}),
    ]).start();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSeconds(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (lastBadge) {
      Animated.sequence([
        Animated.timing(badgeAnim, {toValue: 1, duration: 350, useNativeDriver: true}),
        Animated.delay(2200),
        Animated.timing(badgeAnim, {toValue: 0, duration: 350, useNativeDriver: true}),
      ]).start();
    }
  }, [lastBadge]);

  const formatTime = s => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sc}`;
  };

  const lvlBase = [0, 0, 50, 150, 300, 500];
  const base = lvlBase[levelInfo.level] ?? 0;
  const next = lvlBase[levelInfo.level + 1] ?? levelInfo.next;
  const progressPct = Math.min(((xp - base) / (next - base)) * 100, 100);

  const handleMoodSelect = item => { setSelectedMood(item.id); selectMood(item); };

  const handleDegerlendir = () => {
    if (!selectedMood) { Alert.alert('Uyarı', 'Lütfen önce modunu seç!'); return; }
    navigation.navigate('IyiOlus');
  };

  const renderMood = ({item}) => {
    const sel = selectedMood === item.id;
    return (
      <TouchableOpacity
        style={[styles.moodCard, sel && styles.moodCardSel]}
        onPress={() => handleMoodSelect(item)}
        activeOpacity={0.75}>
        <Text style={styles.moodEmoji}>{item.emoji}</Text>
        <Text style={[styles.moodXP, sel && styles.moodXPActive]}>{sel ? '+10 XP' : '···'}</Text>
        <Text style={[styles.moodLabel, sel && styles.moodLabelActive]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* Badge toast */}
      {lastBadge && (
        <Animated.View style={[styles.toast, {opacity: badgeAnim, transform: [{scale: badgeAnim}]}]}>
          <Text style={styles.toastIcon}>{lastBadge.icon}</Text>
          <View>
            <Text style={styles.toastTitle}>Yeni Rozet! {lastBadge.title}</Text>
            <Text style={styles.toastDesc}>+{lastBadge.xp} XP kazandın!</Text>
          </View>
        </Animated.View>
      )}

      {/* ─── HEADER ─── */}
      <LinearGradient
        colors={['#6d1b7b', '#c2185b', '#e91e8c', '#ff5fa0']}
        style={styles.header}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}>

        {/* Decorative circles for depth */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        {/* brand + timer */}
        <View style={styles.topBar}>
          {/* Logo */}
          <View style={styles.logoWrap}>
            <View style={styles.logoIconWrap}>
              <Text style={styles.logoIcon}>✦</Text>
            </View>
            <View>
              <Text style={styles.brand}>
                <Text style={styles.brandSam}>SAM</Text>
                <Text style={styles.brandMood}>MOOD</Text>
              </Text>
            </View>
          </View>

          <View style={styles.timerWrap}>
            <Text style={styles.timerLabel}>⏱</Text>
            <Text style={styles.timerVal}>{formatTime(seconds)}</Text>
          </View>
        </View>

        {/* Stat cards */}
        <View style={styles.statCards}>

          <View style={[styles.statCard, styles.statCardGlass]}>
            <Text style={styles.statCardTop}>Sv. {levelInfo.level}</Text>
            <Text style={styles.statCardSub}>{levelInfo.title}</Text>
            <View style={styles.miniBar}>
              <View style={[styles.miniBarFill, {width: `${progressPct}%`}]} />
            </View>
            <Text style={styles.statCardXP}>{xp} XP</Text>
          </View>

          <LinearGradient colors={['#5e35b1', '#9c27b0']} style={[styles.statCard, styles.statCardShadow]}>
            <Text style={styles.statCardEmoji}>🔥</Text>
            <Text style={styles.statCardBig}>{streak}</Text>
            <Text style={styles.statCardSubW}>Gün Serisi</Text>
          </LinearGradient>

          <TouchableOpacity onPress={() => navigation.navigate('Badges')} activeOpacity={0.85}>
            <LinearGradient colors={['#f57c00', '#ffb300']} style={[styles.statCard, styles.statCardShadow]}>
              <Text style={styles.statCardEmoji}>🏆</Text>
              <Text style={styles.statCardBig}>{earnedBadges.length}</Text>
              <Text style={styles.statCardSubW}>/{BADGES.length} Rozet</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <View style={styles.wave} />
      </LinearGradient>

      {/* ─── CONTENT ─── */}
      <Animated.View style={[styles.content, {opacity: fadeAnim, transform: [{translateY: slideAnim}]}]}>

        <Text style={styles.sectionLabel}>BUGÜN NASIL HİSSEDİYORSUN?</Text>

        <FlatList
          data={MOODS}
          renderItem={renderMood}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          scrollEnabled={false}
        />

        <TouchableOpacity onPress={handleDegerlendir} activeOpacity={0.85} style={styles.ctaWrap}>
          <LinearGradient
            colors={['#c2185b', '#e91e8c', '#ff5fa0']}
            style={styles.cta}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <Text style={styles.ctaText}>İYİ MİSİN? DEĞERLENDİRELİM</Text>
            <View style={styles.ctaArrow}>
              <Text style={styles.ctaArrowText}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.quoteRow}>
          <Text style={styles.quoteIcon}>💬</Text>
          <Text style={styles.quoteText}>Mutluluk varılacak bir istasyon değil, bir yolculuk biçimidir.</Text>
        </View>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},

  toast: {
    position: 'absolute', top: 54, left: 12, right: 12, zIndex: 999,
    backgroundColor: '#fffde7', borderRadius: 16, padding: 12,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: '#ffd54f',
    shadowColor: '#f9a825', shadowOpacity: 0.25, shadowRadius: 10, elevation: 10,
  },
  toastIcon:  {fontSize: 26},
  toastTitle: {fontSize: 13, fontWeight: '800', color: '#4e342e'},
  toastDesc:  {fontSize: 11, color: '#6d4c41'},

  /* header */
  header: {paddingTop: 48, paddingHorizontal: 18, paddingBottom: 40, overflow: 'hidden'},

  /* Decorative circles */
  decorCircle1: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)', top: -40, right: -40,
  },
  decorCircle2: {
    position: 'absolute', width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: 20, left: -30,
  },

  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14,
  },

  /* Logo */
  logoWrap: {flexDirection: 'row', alignItems: 'center', gap: 8},
  logoIconWrap: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  logoIcon: {color: '#fff', fontSize: 16},
  brand: {letterSpacing: 1},
  brandSam: {
    color: 'rgba(255,255,255,0.45)', fontSize: 18,
    fontWeight: '900', letterSpacing: 1,
  },
  brandMood: {
    color: '#ffffff', fontSize: 18,
    fontWeight: '900', letterSpacing: 1,
  },

  timerWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24, paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  timerLabel: {fontSize: 12},
  timerVal:   {color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 1},

  statCards: {flexDirection: 'row', gap: 8},
  statCard: {
    flex: 1, borderRadius: 18, padding: 10, alignItems: 'center',
  },
  statCardGlass: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  statCardShadow: {
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },

  statCardTop:  {color: '#fff', fontSize: 15, fontWeight: '900'},
  statCardSub:  {color: 'rgba(255,255,255,0.75)', fontSize: 10, marginBottom: 5},
  statCardSubW: {color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '600'},
  miniBar: {
    width: '100%', height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 4,
  },
  miniBarFill:  {height: 4, backgroundColor: '#fff', borderRadius: 2},
  statCardXP:   {color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: '700'},
  statCardEmoji:{fontSize: 20, marginBottom: 2},
  statCardBig:  {color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 24},

  wave: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 24, backgroundColor: '#fafafa',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
  },

  /* content */
  content: {flex: 1, paddingHorizontal: 14, paddingTop: 12, paddingBottom: 6},

  sectionLabel: {
    color: '#c2185b', fontSize: 11, fontWeight: '800',
    letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase',
  },

  grid: {marginBottom: 10},
  moodCard: {
    flex: 1, margin: 4,
    backgroundColor: '#fff', borderRadius: 16,
    alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4,
    borderWidth: 1.5, borderColor: '#f8bbd0',
    shadowColor: '#c2185b', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  moodCardSel: {
    backgroundColor: '#fce4ec', borderColor: '#c2185b',
    elevation: 4,
    shadowOpacity: 0.15,
  },
  moodEmoji:      {fontSize: 28, marginBottom: 3},
  moodXP:         {color: '#f48fb1', fontSize: 10, fontWeight: '700', marginBottom: 2},
  moodXPActive:   {color: '#c2185b'},
  moodLabel:      {color: '#666', fontSize: 11, fontWeight: '700', textAlign: 'center'},
  moodLabelActive:{color: '#880e4f'},

  ctaWrap: {borderRadius: 18, overflow: 'hidden', marginBottom: 10,
    shadowColor: '#c2185b', shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  cta:     {
    paddingVertical: 16, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  ctaText: {color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 1.5, flex: 1, textAlign: 'center'},
  ctaArrow: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  ctaArrowText: {color: '#fff', fontSize: 14, fontWeight: '900'},

  quoteRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fce4ec', borderRadius: 16, padding: 12,
    borderLeftWidth: 3, borderLeftColor: '#c2185b',
  },
  quoteIcon: {fontSize: 16},
  quoteText: {flex: 1, color: '#880e4f', fontSize: 12, fontStyle: 'italic', lineHeight: 18},
});

export default HomeScreen;