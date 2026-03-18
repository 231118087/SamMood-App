import React, {useState} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, ScrollView, Alert, Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const KAMPUS_ICI_KATEGORILER = [
  {id: 'ulasim',    label: 'Ulaşım',    emoji: '🚌', desc: 'Otobüs, servis, ulaşım sorunları'},
  {id: 'yemekhane', label: 'Yemekhane', emoji: '🍽️', desc: 'Yemek kalitesi, hijyen'},
  {id: 'temizlik',  label: 'Temizlik',  emoji: '🧹', desc: 'Bina ve alan temizliği'},
  {id: 'guvenlik',  label: 'Güvenlik',  emoji: '🛡️', desc: 'Kampüs güvenliği'},
  {id: 'diger',     label: 'Diğer',     emoji: '📝', desc: 'Diğer konular'},
];

const KAMPUS_DISI_KATEGORILER = [
  {id: 'ulasim',   label: 'Ulaşım',        emoji: '🚌', desc: 'Şehir içi ulaşım sorunları'},
  {id: 'konut',    label: 'Konut',          emoji: '🏠', desc: 'Kira, ev sorunları'},
  {id: 'saglik',   label: 'Sağlık',         emoji: '🏥', desc: 'Sağlık hizmetleri'},
  {id: 'sosyal',   label: 'Sosyal Yaşam',   emoji: '🎭', desc: 'Sosyal etkinlik, kültür'},
  {id: 'diger',    label: 'Diğer',          emoji: '📝', desc: 'Diğer konular'},
];

// Adım: 'main' | 'kategori' | 'form'
const SikayetScreen = ({navigation}) => {
  const [step, setStep]           = useState('main');
  const [tip, setTip]             = useState(null);       // 'ici' | 'disi'
  const [kategori, setKategori]   = useState(null);
  const [metin, setMetin]         = useState('');
  const [sending, setSending]     = useState(false);

  const kategoriler = tip === 'ici' ? KAMPUS_ICI_KATEGORILER : KAMPUS_DISI_KATEGORILER;

  const handleTipSec = (secilen) => {
    setTip(secilen);
    setKategori(null);
    setMetin('');
    setStep('kategori');
  };

  const handleKategoriSec = (kat) => {
    setKategori(kat);
    setStep('form');
  };

  const handleGonder = () => {
    if (!metin.trim()) {
      Alert.alert('Uyarı', 'Lütfen şikayetinizi yazınız.');
      return;
    }
    setSending(true);
    // Simüle gönderim
    setTimeout(() => {
      setSending(false);
      Alert.alert(
        '✅ Şikayetiniz Alındı',
        `Kategori: ${kategori?.label}\n\n"${metin.trim()}"\n\nEn kısa sürede değerlendirilecektir.`,
        [{text: 'Tamam', onPress: () => {
          setStep('main');
          setTip(null);
          setKategori(null);
          setMetin('');
        }}],
      );
    }, 1000);
  };

  const handleGeri = () => {
    if (step === 'form')     setStep('kategori');
    else if (step === 'kategori') setStep('main');
  };

  // ── MAIN STEP ──
  if (step === 'main') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>✏️ Şikayet / Öneri</Text>

          <View style={styles.questionCard}>
            <View style={styles.questionIconWrap}>
              <Text style={styles.questionIcon}>❓</Text>
            </View>
            <Text style={styles.questionText}>Hangi kısım ile ilgili şikayetin var?</Text>
          </View>

          <Text style={styles.fieldLabel}>BİR ALAN SEÇ</Text>

          <TouchableOpacity style={styles.btn} onPress={() => handleTipSec('ici')} activeOpacity={0.82}>
            <View style={[styles.btnIconWrap, {backgroundColor: '#fce4ec', borderColor: '#f48fb1'}]}>
              <Icon name="business" size={24} color="#c2185b" />
            </View>
            <View style={styles.btnTextWrap}>
              <Text style={styles.btnTitle}>Kampüs İçi</Text>
              <Text style={styles.btnDesc}>Üniversite içi sorunlar ve öneriler</Text>
            </View>
            <View style={[styles.btnArrow, {backgroundColor: '#c2185b'}]}>
              <Text style={styles.btnArrowText}>→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => handleTipSec('disi')} activeOpacity={0.82}>
            <View style={[styles.btnIconWrap, {backgroundColor: '#ede7f6', borderColor: '#ce93d8'}]}>
              <Icon name="location-outline" size={24} color="#5e35b1" />
            </View>
            <View style={styles.btnTextWrap}>
              <Text style={[styles.btnTitle, {color: '#5e35b1'}]}>Kampüs Dışı</Text>
              <Text style={styles.btnDesc}>Kampüs dışı sorunlar ve öneriler</Text>
            </View>
            <View style={[styles.btnArrow, {backgroundColor: '#5e35b1'}]}>
              <Text style={styles.btnArrowText}>→</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>Görüşlerin bizim için değerli! Şikayetlerin 48 saat içinde değerlendirilir.</Text>
          </View>

          <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── KATEGORİ STEP ──
  if (step === 'kategori') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.topNav}>
            <TouchableOpacity onPress={handleGeri} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Geri</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>
              {tip === 'ici' ? '🏛️ Kampüs İçi' : '📍 Kampüs Dışı'}
            </Text>
          </View>

          {/* Breadcrumb */}
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbText}>Şikayet</Text>
            <Text style={styles.breadcrumbSep}>›</Text>
            <Text style={styles.breadcrumbActive}>{tip === 'ici' ? 'Kampüs İçi' : 'Kampüs Dışı'}</Text>
            <Text style={styles.breadcrumbSep}>›</Text>
            <Text style={styles.breadcrumbMuted}>Kategori</Text>
          </View>

          <Text style={styles.fieldLabel}>KATEGORİ SEÇ</Text>

          {kategoriler.map((kat) => (
            <TouchableOpacity
              key={kat.id}
              style={styles.katCard}
              onPress={() => handleKategoriSec(kat)}
              activeOpacity={0.82}>
              <View style={styles.katIconWrap}>
                <Text style={styles.katEmoji}>{kat.emoji}</Text>
              </View>
              <View style={styles.katTextWrap}>
                <Text style={styles.katTitle}>{kat.label}</Text>
                <Text style={styles.katDesc}>{kat.desc}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#f48fb1" />
            </TouchableOpacity>
          ))}

          <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── FORM STEP ──
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.topNav}>
          <TouchableOpacity onPress={handleGeri} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>📝 Şikayetini Yaz</Text>
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Şikayet</Text>
          <Text style={styles.breadcrumbSep}>›</Text>
          <Text style={styles.breadcrumbText}>{tip === 'ici' ? 'Kampüs İçi' : 'Kampüs Dışı'}</Text>
          <Text style={styles.breadcrumbSep}>›</Text>
          <Text style={styles.breadcrumbActive}>{kategori?.label}</Text>
        </View>

        {/* Seçilen kategori badge */}
        <View style={styles.selectedKat}>
          <Text style={styles.selectedKatEmoji}>{kategori?.emoji}</Text>
          <View>
            <Text style={styles.selectedKatLabel}>Seçilen Kategori</Text>
            <Text style={styles.selectedKatTitle}>{kategori?.label}</Text>
          </View>
          <TouchableOpacity onPress={() => setStep('kategori')} style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Değiştir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>ŞİKAYETİNİZİ YAZIN</Text>

        <View style={styles.textAreaWrap}>
          <TextInput
            style={styles.textArea}
            value={metin}
            onChangeText={setMetin}
            placeholder="Şikayetinizi veya önerinizi buraya yazınız..."
            placeholderTextColor="#f48fb1"
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{metin.length}/500</Text>
        </View>

        <TouchableOpacity
          onPress={handleGonder}
          activeOpacity={0.85}
          style={styles.sendWrap}
          disabled={sending}>
          <LinearGradient
            colors={sending ? ['#f48fb1', '#f48fb1'] : ['#c2185b', '#e91e8c', '#ff5fa0']}
            style={styles.sendBtn}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <Text style={styles.sendBtnText}>
              {sending ? '⏳ Gönderiliyor...' : '📤 GÖNDER'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},
  content: {padding: 20, paddingTop: 16, paddingBottom: 36},

  topNav: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16},
  backBtn: {backgroundColor: '#fce4ec', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8},
  backBtnText: {color: '#c2185b', fontSize: 13, fontWeight: '800'},
  pageTitle: {fontSize: 20, fontWeight: '900', color: '#880e4f', flex: 1},

  breadcrumb: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, flexWrap: 'wrap'},
  breadcrumbText:   {fontSize: 12, color: '#bbb', fontWeight: '600'},
  breadcrumbSep:    {fontSize: 12, color: '#ddd'},
  breadcrumbActive: {fontSize: 12, color: '#c2185b', fontWeight: '800'},
  breadcrumbMuted:  {fontSize: 12, color: '#ddd'},

  questionCard: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 20, padding: 18, borderWidth: 1.5, borderColor: '#f48fb1', marginBottom: 24, shadowColor: '#c2185b', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3},
  questionIconWrap: {width: 48, height: 48, borderRadius: 14, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  questionIcon: {fontSize: 24},
  questionText: {flex: 1, color: '#880e4f', fontSize: 14, fontWeight: '600', lineHeight: 22},

  fieldLabel: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 14},

  btn: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 12, borderWidth: 1.5, borderColor: '#f8bbd0', shadowColor: '#c2185b', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  btnIconWrap: {width: 50, height: 50, borderRadius: 15, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center'},
  btnTextWrap: {flex: 1},
  btnTitle: {fontSize: 15, fontWeight: '900', color: '#c2185b', marginBottom: 2},
  btnDesc: {fontSize: 12, color: '#aaa'},
  btnArrow: {width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center'},
  btnArrowText: {color: '#fff', fontSize: 14, fontWeight: '900'},

  katCard: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: '#f8bbd0', shadowColor: '#c2185b', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1},
  katIconWrap: {width: 48, height: 48, borderRadius: 14, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  katEmoji: {fontSize: 24},
  katTextWrap: {flex: 1},
  katTitle: {fontSize: 15, fontWeight: '800', color: '#880e4f', marginBottom: 2},
  katDesc: {fontSize: 12, color: '#aaa'},

  selectedKat: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fce4ec', borderRadius: 18, padding: 16, marginBottom: 20, borderWidth: 1.5, borderColor: '#f48fb1'},
  selectedKatEmoji: {fontSize: 28},
  selectedKatLabel: {fontSize: 11, color: '#f48fb1', fontWeight: '700', marginBottom: 2},
  selectedKatTitle: {fontSize: 15, fontWeight: '900', color: '#880e4f'},
  changeBtn: {marginLeft: 'auto', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1.5, borderColor: '#f48fb1'},
  changeBtnText: {color: '#c2185b', fontSize: 12, fontWeight: '800'},

  textAreaWrap: {backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#f8bbd0', padding: 16, marginBottom: 20, shadowColor: '#c2185b', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1},
  textArea: {color: '#333', fontSize: 14, lineHeight: 22, minHeight: 140},
  charCount: {color: '#f48fb1', fontSize: 11, fontWeight: '700', textAlign: 'right', marginTop: 8},

  sendWrap: {borderRadius: 18, overflow: 'hidden', shadowColor: '#c2185b', shadowOpacity: 0.3, shadowRadius: 10, elevation: 6, marginBottom: 24},
  sendBtn: {paddingVertical: 18, alignItems: 'center'},
  sendBtnText: {color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1.5},

  tipCard: {flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fffde7', borderRadius: 16, padding: 14, borderLeftWidth: 3, borderLeftColor: '#fbc02d', marginTop: 8, marginBottom: 24},
  tipIcon: {fontSize: 18},
  tipText: {flex: 1, color: '#5d4037', fontSize: 13, lineHeight: 20},

  footer: {color: '#ccc', textAlign: 'center', fontSize: 13, fontWeight: '700'},
});

export default SikayetScreen;