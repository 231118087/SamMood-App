import React, {useState, useRef, useEffect} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Modal, Linking, Animated, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StresAzaltmaScreen = ({navigation}) => {
  const [showYoutube, setShowYoutube] = useState(false);
  const contentAnim  = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentAnim,  {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.spring(contentSlide, {toValue: 0, friction: 8, useNativeDriver: true}),
    ]).start();
  }, []);

  const handleWatch = () => {
    Linking.openURL('https://www.youtube.com/results?search_query=stres+yönetimi');
    setShowYoutube(false);
  };

  const categories = [
    {emoji: '🍄', title: 'Stresi Yönet',     desc: 'Videolarla stres yönetimi teknikleri',  action: () => setShowYoutube(true), color: '#c2185b', bg: '#fce4ec', border: '#f48fb1'},
    {emoji: '🌙', title: 'İyi Uyu',           desc: 'Uyku kaliteni artırmak için ipuçları',  action: () => {},                   color: '#5e35b1', bg: '#ede7f6', border: '#ce93d8'},
    {emoji: '🌬️', title: 'Nefes Egzersizi',  desc: 'Anında rahatlama için nefes teknikleri',action: () => {},                   color: '#0277bd', bg: '#e1f5fe', border: '#81d4fa'},
    {emoji: '🎵', title: 'Rahatlama Müziği',  desc: 'Sakinleştirici sesler ve müzik',        action: () => {},                   color: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, {opacity: contentAnim, transform: [{translateY: contentSlide}]}]}>

        {/* Top nav */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Stres Azaltma</Text>
        </View>

        <View style={styles.introCard}>
          <View style={styles.introIconWrap}>
            <Text style={styles.introEmoji}>🌿</Text>
          </View>
          <View style={styles.introTextWrap}>
            <Text style={styles.introTitle}>Stresini Azalt</Text>
            <Text style={styles.introDesc}>Hangi konuda stresini azaltmak istersin?</Text>
          </View>
        </View>

        <Text style={styles.fieldLabel}>ARAÇLAR</Text>

        <View style={styles.grid}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.card, {backgroundColor: cat.bg, borderColor: cat.border}]}
              onPress={cat.action}
              activeOpacity={0.82}>
              <View style={[styles.cardIconWrap, {backgroundColor: cat.bg, borderColor: cat.border}]}>
                <Text style={styles.cardEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[styles.cardTitle, {color: cat.color}]}>{cat.title}</Text>
              <Text style={styles.cardDesc}>{cat.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Text style={styles.tipIcon}>💡</Text>
          </View>
          <Text style={styles.tipText}>
            Düzenli nefes egzersizleri kortizol seviyesini düşürür ve anında rahatlama sağlar.
          </Text>
        </View>

        <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
      </Animated.View>

      <Modal visible={showYoutube} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalIconWrap}>
              <Text style={styles.modalEmoji}>▶️</Text>
            </View>
            <Text style={styles.modalTitle}>YouTube</Text>
            <Text style={styles.modalDesc}>Stres yönetimi videoları için YouTube'a yönlendiriliyorsun.</Text>
            <TouchableOpacity onPress={handleWatch} activeOpacity={0.85} style={styles.modalBtnWrap}>
              <LinearGradient colors={['#c2185b', '#e91e8c', '#ff5fa0']} style={styles.modalBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                <Text style={styles.modalBtnText}>▶ İZLE →</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowYoutube(false)}>
              <Text style={styles.modalCancel}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},
  content: {flex: 1, padding: 20, paddingTop: 16},

  topNav: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20},
  backBtn: {backgroundColor: '#fce4ec', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8},
  backBtnText: {color: '#c2185b', fontSize: 13, fontWeight: '800'},
  pageTitle: {fontSize: 20, fontWeight: '900', color: '#880e4f', letterSpacing: 0.5},

  introCard: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 20, padding: 18, borderWidth: 1.5, borderColor: '#f48fb1', marginBottom: 24, shadowColor: '#c2185b', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3},
  introIconWrap: {width: 52, height: 52, borderRadius: 16, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  introEmoji: {fontSize: 28},
  introTextWrap: {flex: 1},
  introTitle: {color: '#880e4f', fontSize: 16, fontWeight: '900', marginBottom: 3},
  introDesc: {color: '#c2185b', fontSize: 13},

  fieldLabel: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 14},

  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16},
  card: {width: '47%', borderRadius: 20, borderWidth: 1.5, padding: 18, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 5, elevation: 1},
  cardIconWrap: {width: 54, height: 54, borderRadius: 16, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginBottom: 10},
  cardEmoji: {fontSize: 26},
  cardTitle: {fontSize: 13, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  cardDesc: {color: '#999', fontSize: 11, textAlign: 'center', lineHeight: 16},

  tipCard: {flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fffde7', borderRadius: 16, padding: 14, borderLeftWidth: 3, borderLeftColor: '#fbc02d', marginBottom: 24},
  tipIconWrap: {width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff9c4', justifyContent: 'center', alignItems: 'center'},
  tipIcon: {fontSize: 18},
  tipText: {flex: 1, color: '#5d4037', fontSize: 13, lineHeight: 20},

  footer: {color: '#ccc', textAlign: 'center', fontSize: 13, fontWeight: '700'},

  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center'},
  modal: {backgroundColor: '#fff', borderRadius: 24, padding: 28, width: '85%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 20, elevation: 12},
  modalIconWrap: {width: 70, height: 70, borderRadius: 22, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center', marginBottom: 14},
  modalEmoji: {fontSize: 36},
  modalTitle: {color: '#880e4f', fontSize: 20, fontWeight: '900', marginBottom: 10, letterSpacing: 1},
  modalDesc: {color: '#777', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24},
  modalBtnWrap: {width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 12},
  modalBtn: {paddingVertical: 16, alignItems: 'center'},
  modalBtnText: {color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 1.5},
  modalCancel: {color: '#bbb', fontSize: 14},
});

export default StresAzaltmaScreen;