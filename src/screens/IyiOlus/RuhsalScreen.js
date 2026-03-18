import React, {useRef, useEffect, useState} from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, SafeAreaView,
  Modal, Pressable,
} from 'react-native';

const tips = [
  {
    emoji: '🧘',
    title: 'Günlük Meditasyon',
    desc: 'Günde 10 dakika sessizce nefes alın ve zihninizi dinlendirin.',
    color: '#7c3aed',
    light: '#ede9fe',
    border: '#c4b5fd',
    article: {
      title: 'Günlük Meditasyonun Faydaları',
      readTime: '3 dk okuma',
      content: `Meditasyon, binlerce yıldır insanlığın zihinsel ve ruhsal dengeyi bulmasına yardımcı olan köklü bir pratiktir. Modern nörobilim araştırmaları, düzenli meditasyonun beyin yapısını fiziksel olarak değiştirebildiğini ortaya koymuştur.\n\nGünde yalnızca 10 dakika gözleri kapatıp nefesinize odaklanmak, kortizol (stres hormonu) düzeyini belirgin biçimde düşürür. Amigdala — beynin "tehlike dedektörü" — meditasyon yapanlarda daha az aktif hale gelir; bu da gündelik kaygıların sizi daha az ele geçirmesi anlamına gelir.\n\nNasıl başlamalısınız?\n\nSabah yataktan kalkar kalkmaz, henüz telefona bakmadan oturun. Sırtınızı dik tutun, gözlerinizi kapatın. Burnunuzdan 4 saniye nefes alın, 4 saniye tutun, 4 saniyede verin. Zihin dağıldığında — ki dağılacaktır — bu normaldir. Sadece dikkati nazikçe geri getirin. Haftalarca düzenli uygulama sonrası uyku kalitesinde, odaklanmada ve duygusal dayanıklılıkta fark edilir iyileşme yaşanır.`,
    },
  },
  {
    emoji: '📓',
    title: 'Şükran Günlüğü',
    desc: 'Her gün 3 şey yazın; bunlara sahip olduğunuz için şükran duyun.',
    color: '#d97706',
    light: '#fef3c7',
    border: '#fcd34d',
    article: {
      title: 'Şükran Pratiğinin Psikolojisi',
      readTime: '4 dk okuma',
      content: `Pozitif psikoloji araştırmacısı Martin Seligman ve ekibinin yürüttüğü kapsamlı çalışmalar, her gün 3 olumlu şey yazmanın depresyon belirtilerini azaltıp mutluluk düzeyini kalıcı biçimde yükselttiğini göstermektedir.\n\nBunun arkasındaki mekanizma oldukça ilgi çekicidir: beyin doğası gereği olumsuzluğa odaklanır (tehlikelerden korunmak için evrimleşmiş bir refleks). Şükran günlüğü bu önyargıyı bilinçli olarak dengeler ve sinaptik yolların zamanla yeniden şekillenmesini sağlar.\n\nUygulama İpuçları:\n\nHer gece yatmadan önce not defterinizi açın. Sadece madde sıralamak yetmez; neden minnettarsınız, o anı nasıl hissettiniz? Bunu da yazın. Derinlik, yüzeysel listeden çok daha güçlü etki yaratır. Birkaç hafta sonra geçmiş sayfaları okumak, zor günlerde sizi ayakta tutan güçlü bir kaynağa dönüşür.`,
    },
  },
  {
    emoji: '🌲',
    title: 'Doğada Vakit',
    desc: 'Açık havada yürüyüş yapın, doğayla bağlantı kurun.',
    color: '#16a34a',
    light: '#dcfce7',
    border: '#86efac',
    article: {
      title: 'Doğanın İyileştirici Gücü',
      readTime: '3 dk okuma',
      content: `Japon geleneği "Shinrin-yoku" (orman banyosu) son yıllarda batı biliminin de ilgisini çekiyor. Araştırmalar, ormanlık alanda yalnızca 20 dakika yürüyüşün NK (doğal katil) hücrelerini — bağışıklık sisteminin önemli bir bileşeni — artırdığını ortaya koyuyor.\n\nDoğa sesleri (yaprak hışırtısı, kuş sesi, su akışı) sempatik sinir sistemini yatıştırıp parasempatik sistemi aktive eder; yani vücudu "savaş ya da kaç" modundan "dinlen ve iyileş" moduna taşır.\n\nŞehirde yaşıyorsanız:\n\nBüyük bir ormana ihtiyacınız yok. Park, sahil kenarı ya da ağaçlı bir sokak bile yeterlidir. Kulaklıksız, telefonsuz yürüyün. Adımlarınızı hissedin, etrafa bakın, derin nefes alın. Haftada 3 kez 30 dakikalık bu alışkanlık, kaygı ve tükenmişlik belirtilerini anlamlı ölçüde azaltır.`,
    },
  },
  {
    emoji: '🤝',
    title: 'Sosyal Bağlantı',
    desc: 'Sevdiklerinizle kaliteli zaman geçirin ve destek ağınızı güçlendirin.',
    color: '#0284c7',
    light: '#e0f2fe',
    border: '#7dd3fc',
    article: {
      title: 'İlişkilerin Ruh Sağlığına Etkisi',
      readTime: '4 dk okuma',
      content: `Harvard Üniversitesi'nin 80 yılı aşkın süren "Yetişkin Gelişimi Çalışması" tarihte insanlar üzerinde yürütülen en uzun süreli araştırmalardan biridir. Sonuç çarpıcı biçimde nettir: mutlu ve sağlıklı yaşlamanın en güçlü yordayıcısı ilişki kalitesidir — ne servet, ne kariyer, ne de genetik.\n\nSosyal izolasyon, günde 15 sigara içmekle eşdeğer sağlık riski taşıyor. Yalnızlık yalnızca duygusal bir acı değil; bağışıklık sistemini, uyku düzenini ve bilişsel işlevleri doğrudan etkileyen fizyolojik bir stres faktörüdür.\n\nKaliteli bağlantı için:\n\nSosyal medya takibi, gerçek bağlantının yerini tutmaz. Haftada en az bir kez birisiyle yüz yüze ya da sesli konuşun. "Nasılsın?" yerine daha derin sorular sormayı deneyin. Derinlik, genişliğin önüne geçer.`,
    },
  },
  {
    emoji: '💤',
    title: 'Düzenli Uyku',
    desc: 'Her gece aynı saatte yatıp kalkmaya çalışın.',
    color: '#1e40af',
    light: '#dbeafe',
    border: '#93c5fd',
    article: {
      title: 'Uyku ve Zihinsel Sağlık',
      readTime: '5 dk okuma',
      content: `Matthew Walker'ın araştırmalarına göre bir gece bile 6 saatin altına düşmek, bağışıklık tepkisini yüzde kırk oranında zayıflatıyor.\n\nBeyin, uyku sırasında "glimfatik sistem" aracılığıyla gün boyunca biriken metabolik atıkları temizler — Alzheimer ile ilişkilendirilen beta-amiloid plaklarının uzaklaştırılması da dahil. Yani uyku, beynin günlük temizlik operasyonudur.\n\nDüzenli uyku için kanıtlanmış öneriler:\n\nHaftasonu dahil her gün aynı saatte yatın ve kalkın; biyolojik saatiniz tutarlılık sever. Uyumadan 90 dakika önce ekran ışığını kısın veya mavi ışık filtresi kullanın. Yatak odası yalnızca uyku için olsun. 18-20°C oda sıcaklığı derin uykuyu destekler.`,
    },
  },
  {
    emoji: '🎨',
    title: 'Yaratıcı Aktivite',
    desc: 'Boyama, müzik, yazı — kendinizi ifade edin.',
    color: '#be185d',
    light: '#fce7f3',
    border: '#f9a8d4',
    article: {
      title: 'Yaratıcılığın Terapötik Gücü',
      readTime: '3 dk okuma',
      content: `Sanat terapisi, müzik terapisi ve yazı terapisi artık klinik ortamlarda dünya genelinde kullanılıyor. Araştırmalar, yaratıcı ifadenin travma işlemede, anksiyete yönetiminde ve öz-saygının geliştirilmesinde etkili olduğunu gösteriyor.\n\nNeden bu kadar güçlü? Yaratıcı süreç, prefrontal korteksin aşırı analizci sesini arka plana iter ve beynin varsayılan mod ağını aktive eder — bu ağ, kimlik duygusunun, empatinin ve anlam üretiminin merkezidir.\n\nBasit başlangıç noktaları:\n\nProfessyonel olmak zorunda değilsiniz. Her sabah 5 dakika akla gelen her şeyi kâğıda karalamak, bir enstrümanı yıllar sonra yeniden denemek, ya da el sanatlarıyla uğraşmak yeterlidir. Ürün değil, süreç önemlidir. Yaratırken yargılamayı bırakın, akışa güvenin.`,
    },
  },
];

const ArticleModal = ({tip, visible, onClose}) => {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {toValue: 1, duration: 250, useNativeDriver: true}),
        Animated.spring(slideAnim, {toValue: 0, friction: 9, tension: 60, useNativeDriver: true}),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {toValue: 0, duration: 200, useNativeDriver: true}),
        Animated.timing(slideAnim, {toValue: 600, duration: 200, useNativeDriver: true}),
      ]).start();
    }
  }, [visible]);

  if (!tip) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.modalSheet, {transform: [{translateY: slideAnim}]}]}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={[styles.modalHeader, {backgroundColor: tip.light, borderBottomColor: tip.border}]}>
            <View style={[styles.modalIconWrap, {backgroundColor: tip.color + '22'}]}>
              <Text style={styles.modalEmoji}>{tip.emoji}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.modalTitle, {color: tip.color}]}>{tip.article.title}</Text>
              <Text style={[styles.modalReadTime, {color: tip.color + 'bb'}]}>📖 {tip.article.readTime}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, {backgroundColor: tip.color + '18'}]}>
              <Text style={[styles.closeBtnText, {color: tip.color}]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={[styles.articleAccent, {backgroundColor: tip.color}]} />
            <Text style={styles.articleText}>{tip.article.content}</Text>
            <View style={styles.modalFooterSpace} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const RuhsalScreen = ({navigation}) => {
  const contentAnim  = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(20)).current;
  const [selectedTip, setSelectedTip] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentAnim,  {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.spring(contentSlide, {toValue: 0, friction: 8, useNativeDriver: true}),
    ]).start();
  }, []);

  const openArticle = (tip) => {
    setSelectedTip(tip);
    setModalVisible(true);
  };

  const closeArticle = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedTip(null), 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: contentAnim, transform: [{translateY: contentSlide}]}}>

          {/* Top nav */}
          <View style={styles.topNav}>
            {navigation && (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backBtnText}>← Geri</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.pageTitle}>Ruhsal İyi Oluş</Text>
          </View>

          {/* Intro Card */}
          <View style={styles.introCard}>
            <View style={styles.introIconWrap}>
              <Text style={styles.introEmoji}>🧠</Text>
            </View>
            <View style={styles.introText}>
              <Text style={styles.introTitle}>Zihinsel Sağlığın</Text>
              <Text style={styles.introDesc}>Duygusal denge ve zihinsel sağlığını desteklemek için önerileri incele.</Text>
            </View>
          </View>

          <Text style={styles.fieldLabel}>ÖNERİLER</Text>

          {tips.map((tip, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.tipCard, {borderColor: tip.border}]}
              onPress={() => openArticle(tip)}
              activeOpacity={0.75}>
              <View style={[styles.tipIconWrap, {backgroundColor: tip.light}]}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
              <View style={[styles.arrowBadge, {backgroundColor: tip.light}]}>
                <Text style={[styles.arrowText, {color: tip.color}]}>›</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.ctaCard}>
            <View style={styles.ctaIconWrap}>
              <Text style={styles.ctaEmoji}>💬</Text>
            </View>
            <Text style={styles.ctaTitle}>Destek almak ister misin?</Text>
            <Text style={styles.ctaDesc}>Psikolojik danışmanlık için Güvenlik ekranını ziyaret et.</Text>
          </View>

          <Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>
        </Animated.View>
      </ScrollView>

      <ArticleModal tip={selectedTip} visible={modalVisible} onClose={closeArticle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8fafc'},
  scrollContent: {padding: 20, paddingTop: 16, paddingBottom: 36},

  topNav: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20},
  backBtn: {backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8},
  backBtnText: {color: '#374151', fontSize: 13, fontWeight: '800'},
  pageTitle: {fontSize: 20, fontWeight: '900', color: '#111827', letterSpacing: 0.5},

  introCard: {flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 20, padding: 18, borderWidth: 1.5, borderColor: '#e5e7eb', marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 3},
  introIconWrap: {width: 52, height: 52, borderRadius: 16, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center'},
  introEmoji: {fontSize: 28},
  introText: {flex: 1},
  introTitle: {color: '#111827', fontSize: 16, fontWeight: '900', marginBottom: 4},
  introDesc: {color: '#6b7280', fontSize: 13, lineHeight: 20},

  fieldLabel: {color: '#9ca3af', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12},

  tipCard: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1.5, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 5, elevation: 1, gap: 14},
  tipIconWrap: {width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center'},
  tipEmoji: {fontSize: 24},
  tipContent: {flex: 1},
  tipTitle: {color: '#111827', fontSize: 14, fontWeight: '800', marginBottom: 3},
  tipDesc: {color: '#9ca3af', fontSize: 12, lineHeight: 18},
  arrowBadge: {width: 30, height: 30, borderRadius: 9, justifyContent: 'center', alignItems: 'center'},
  arrowText: {fontSize: 22, fontWeight: '700', lineHeight: 28},

  ctaCard: {backgroundColor: '#f0fdf4', borderRadius: 20, padding: 22, alignItems: 'center', marginTop: 6, marginBottom: 24, borderWidth: 1.5, borderColor: '#bbf7d0'},
  ctaIconWrap: {width: 56, height: 56, borderRadius: 18, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3},
  ctaEmoji: {fontSize: 28},
  ctaTitle: {color: '#14532d', fontSize: 15, fontWeight: '900', marginBottom: 6},
  ctaDesc: {color: '#16a34a', fontSize: 13, textAlign: 'center', lineHeight: 20},

  footer: {color: '#d1d5db', textAlign: 'center', fontSize: 13, fontWeight: '700'},

  // Modal
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end'},
  modalSheet: {backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '85%', overflow: 'hidden'},
  handle: {width: 40, height: 4, borderRadius: 2, backgroundColor: '#d1d5db', alignSelf: 'center', marginTop: 12, marginBottom: 4},
  modalHeader: {flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, paddingTop: 12, borderBottomWidth: 1.5},
  modalIconWrap: {width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center'},
  modalEmoji: {fontSize: 26},
  modalTitle: {fontSize: 15, fontWeight: '900', lineHeight: 20},
  modalReadTime: {fontSize: 12, fontWeight: '600', marginTop: 2},
  closeBtn: {width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center'},
  closeBtnText: {fontSize: 16, fontWeight: '700'},
  modalBody: {paddingHorizontal: 20, paddingTop: 16},
  articleAccent: {width: 36, height: 4, borderRadius: 2, marginBottom: 16},
  articleText: {fontSize: 14, lineHeight: 24, color: '#374151'},
  modalFooterSpace: {height: 40},
});

export default RuhsalScreen;