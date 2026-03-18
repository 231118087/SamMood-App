import React, {useState} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Alert, Linking, Modal, ScrollView, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useApp} from '../../context/AppContext';

// ─── Badge definitions ───────────────────────────────────────────────────────
const ALL_BADGES = [
  {id: 'streak3',   emoji: '🔥', label: '3 Gün'},
  {id: 'streak7',   emoji: '⚡', label: '7 Gün'},
  {id: 'xp100',     emoji: '💎', label: '100 XP'},
  {id: 'social',    emoji: '🤝', label: 'Sosyal'},
  {id: 'creative',  emoji: '🎨', label: 'Yaratıcı'},
  {id: 'nature',    emoji: '🌿', label: 'Doğa'},
];

// ─── Level colour palette ─────────────────────────────────────────────────────
const LEVEL_COLORS = [
  ['#6d1b7b', '#e91e8c'],   // lv 1  – deep purple → hot pink (SAMMOOD brand)
  ['#7b1fa2', '#f06292'],   // lv 2  – purple → soft pink
  ['#4a148c', '#e040fb'],   // lv 3  – dark violet → bright magenta
  ['#880e4f', '#ff4081'],   // lv 4  – deep rose → bright pink
  ['#4527a0', '#e91e8c'],   // lv 5+ – indigo → magenta
];
const levelGradient = (level) => LEVEL_COLORS[Math.min((level || 1) - 1, LEVEL_COLORS.length - 1)];

// ─── XP progress bar ──────────────────────────────────────────────────────────
const XP_PER_LEVEL = 100;
const XpBar = ({xp, color}) => {
  const pct = Math.min(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100, 100);
  return (
    <View style={xpStyles.wrap}>
      <View style={xpStyles.track}>
        <LinearGradient colors={color} style={[xpStyles.fill, {width: `${pct}%`}]} start={{x:0,y:0}} end={{x:1,y:0}} />
      </View>
      <Text style={xpStyles.label}>{xp % XP_PER_LEVEL}/{XP_PER_LEVEL} XP</Text>
    </View>
  );
};
const xpStyles = StyleSheet.create({
  wrap:  {marginTop: 8},
  track: {height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.22)', overflow: 'hidden'},
  fill:  {height: '100%', borderRadius: 4},
  label: {color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '700', marginTop: 5, textAlign: 'right'},
});

// ─── Main screen ─────────────────────────────────────────────────────────────
const GuvenlikScreen = ({navigation}) => {
  const {user, logout, xp, streak, levelInfo, earnedBadges} = useApp();
  const [showKades, setShowKades] = useState(false);

  const gradColors = levelGradient(levelInfo?.level);

  const handleLogout = () => {
    Alert.alert('Çıkış', 'Çıkış yapmak istediğinize emin misiniz?', [
      {text: 'İptal', style: 'cancel'},
      {text: 'Çıkış Yap', style: 'destructive', onPress: () => {
        logout();
        navigation.replace('Login');
      }},
    ]);
  };

  const handleKadesOnayla = () => {
    setShowKades(false);
    Linking.openURL('market://details?id=com.egm.kades').catch(() =>
      Linking.openURL('https://play.google.com/store/apps/details?id=com.egm.kades'),
    );
  };

  const handlePsikolog = () => {
    Alert.alert(
      'Psikolojik Destek',
      'Samsun Üniversitesi Psikolojik Danışmanlık birimine bağlanmak istiyor musunuz?',
      [
        {text: 'İptal', style: 'cancel'},
        {text: 'Ara', onPress: () => Linking.openURL('tel:03622576000')},
      ],
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Page header ── */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Profil</Text>
          <View style={s.headerDot} />
        </View>

        {/* ── Profile card ── */}
        <LinearGradient colors={gradColors} style={s.card} start={{x:0,y:0}} end={{x:1,y:1}}>
          {/* decorative blobs */}
          <View style={[s.blob, {width:160, height:160, top:-50, right:-40, opacity:0.12}]} />
          <View style={[s.blob, {width:80, height:80, bottom:10, left:10, opacity:0.10}]} />

          {/* ── Single compact row: avatar + info + level ── */}
          <View style={s.cardTop}>
            <View style={s.avatarWrap}>
              <Text style={s.avatarText}>
                {user?.studentNo ? user.studentNo.slice(-2) : '??'}
              </Text>
            </View>
            <View style={s.cardInfo}>
              <Text style={s.cardNo}>#{user?.studentNo || '---'}</Text>
              <Text style={s.cardSub}>{user?.age} yaş · {user?.gender}</Text>
            </View>
            {/* level pill — right side */}
            <View style={s.levelPill}>
              <Text style={s.levelPillNum}>{levelInfo?.level ?? 1}</Text>
              <Text style={s.levelPillTitle}>{levelInfo?.title ?? 'Başlangıç'}</Text>
            </View>
          </View>

          {/* XP progress */}
          <XpBar xp={xp ?? 0} color={gradColors} />

          {/* stats row */}
          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Text style={s.statVal}>{xp ?? 0}</Text>
              <Text style={s.statKey}>XP</Text>
            </View>
            <View style={s.statSep} />
            <View style={s.statBox}>
              <Text style={s.statVal}>{streak ?? 0}</Text>
              <Text style={s.statKey}>🔥 Seri</Text>
            </View>
            <View style={s.statSep} />
            <View style={s.statBox}>
              <Text style={s.statVal}>{earnedBadges?.length ?? 0}</Text>
              <Text style={s.statKey}>🏆 Rozet</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Badges section ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionLabel}>KAZANILAN ROZETLER</Text>
          <View style={[s.pill, {backgroundColor: gradColors[0] + '22'}]}>
            <Text style={[s.pillText, {color: gradColors[0]}]}>{earnedBadges?.length ?? 0}/{ALL_BADGES.length}</Text>
          </View>
        </View>

        <View style={s.badgeGrid}>
          {ALL_BADGES.map((b) => {
            const earned = (earnedBadges || []).includes(b.id);
            return (
              <View key={b.id} style={[s.badgeItem, !earned && s.badgeLocked]}>
                <LinearGradient
                  colors={earned ? gradColors : ['#e5e7eb', '#d1d5db']}
                  style={s.badgeCircle}
                  start={{x:0,y:0}} end={{x:1,y:1}}>
                  <Text style={[s.badgeEmoji, !earned && {opacity: 0.35}]}>{b.emoji}</Text>
                </LinearGradient>
                <Text style={[s.badgeLabel, !earned && {color: '#bbb'}]}>{b.label}</Text>
              </View>
            );
          })}
        </View>

        {/* ── Security support ── */}
        <Text style={[s.sectionLabel, {marginTop: 12, marginBottom: 4}]}>GÜVENLİK DESTEĞİ</Text>
        <Text style={s.sectionSub}>Hangi konuda güvenlik desteği almak istersin?</Text>

        {/* KADES btn */}
        <TouchableOpacity style={s.actionCard} onPress={() => setShowKades(true)} activeOpacity={0.8}>
          <LinearGradient colors={['#fce4ec','#fff']} style={s.actionGrad} start={{x:0,y:0}} end={{x:1,y:0}}>
            <View style={[s.actionIcon, {backgroundColor: '#fce4ec'}]}>
              <Text style={s.actionEmoji}>🛡️</Text>
            </View>
            <View style={s.actionText}>
              <Text style={[s.actionTitle, {color: '#be123c'}]}>KADES</Text>
              <Text style={s.actionDesc}>Kadına Destek Sistemi</Text>
            </View>
            <View style={[s.actionArrow, {backgroundColor: '#be123c'}]}>
              <Text style={s.arrowText}>›</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* PDR btn */}
        <TouchableOpacity style={s.actionCard} onPress={handlePsikolog} activeOpacity={0.8}>
          <LinearGradient colors={['#e0f2fe','#fff']} style={s.actionGrad} start={{x:0,y:0}} end={{x:1,y:0}}>
            <View style={[s.actionIcon, {backgroundColor: '#e0f2fe'}]}>
              <Text style={s.actionEmoji}>🧠</Text>
            </View>
            <View style={s.actionText}>
              <Text style={[s.actionTitle, {color: '#0369a1'}]}>Psikolojik Destek</Text>
              <Text style={s.actionDesc}>Samsun Üniversitesi PDR</Text>
            </View>
            <View style={[s.actionArrow, {backgroundColor: '#0369a1'}]}>
              <Text style={s.arrowText}>›</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ── Logout ── */}
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={s.logoutText}>🚪  Çıkış Yap</Text>
        </TouchableOpacity>

        <Text style={s.footer}>🎓 Samsun Üniversitesi © 2026</Text>
      </ScrollView>

      {/* ── KADES modal ── */}
      <Modal visible={showKades} transparent animationType="fade">
        <View style={m.overlay}>
          <View style={m.sheet}>
            <LinearGradient colors={['#fce4ec','#fff5f7']} style={m.sheetGrad}>
              <View style={m.iconWrap}>
                <Text style={m.iconEmoji}>🛡️</Text>
              </View>
              <Text style={m.title}>KADES</Text>
              <Text style={m.desc}>
                KADES uygulamasına yönlendiriliyorsun. Uygulama yüklü değilse Play Store'a yönlendirileceksin.
              </Text>
              <TouchableOpacity onPress={handleKadesOnayla} activeOpacity={0.85} style={m.confirmWrap}>
                <LinearGradient colors={['#e11d48','#be123c']} style={m.confirmBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                  <Text style={m.confirmText}>Devam Et  →</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowKades(false)} style={m.cancelWrap}>
                <Text style={m.cancelText}>İptal</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: {flex:1, backgroundColor:'#f1f5f9'},
  scroll:    {padding:16, paddingTop:12, paddingBottom:16},

  // header
  header:      {flexDirection:'row', alignItems:'center', gap:8, marginBottom:12},
  headerTitle: {fontSize:22, fontWeight:'900', color:'#0f172a', letterSpacing:-0.5},
  headerDot:   {width:7, height:7, borderRadius:4, backgroundColor:'#e91e8c', marginTop:3},

  // profile card — compact
  card:     {borderRadius:22, padding:14, marginBottom:14, overflow:'hidden'},
  blob:     {position:'absolute', borderRadius:999, backgroundColor:'#fff'},
  cardTop:  {flexDirection:'row', alignItems:'center', gap:10, marginBottom:10},
  avatarWrap:{width:48, height:48, borderRadius:15, backgroundColor:'rgba(255,255,255,0.28)', justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'rgba(255,255,255,0.5)'},
  avatarText:{color:'#fff', fontSize:18, fontWeight:'900'},
  cardInfo:  {flex:1},
  cardNo:    {color:'#fff', fontSize:16, fontWeight:'900', letterSpacing:-0.3},
  cardSub:   {color:'rgba(255,255,255,0.75)', fontSize:12, fontWeight:'600', marginTop:1},

  // level pill (right side of top row)
  levelPill:      {alignItems:'center', backgroundColor:'rgba(255,255,255,0.22)', borderRadius:12, paddingHorizontal:10, paddingVertical:6},
  levelPillNum:   {color:'#fff', fontSize:18, fontWeight:'900', lineHeight:22},
  levelPillTitle: {color:'rgba(255,255,255,0.8)', fontSize:9, fontWeight:'800', textTransform:'uppercase', letterSpacing:0.5},

  // stats
  statsRow:{flexDirection:'row', marginTop:10, backgroundColor:'rgba(255,255,255,0.16)', borderRadius:12, paddingVertical:8},
  statBox: {flex:1, alignItems:'center'},
  statSep: {width:1, backgroundColor:'rgba(255,255,255,0.25)'},
  statVal: {color:'#fff', fontSize:16, fontWeight:'900'},
  statKey: {color:'rgba(255,255,255,0.72)', fontSize:10, fontWeight:'700', marginTop:1},

  // badges
  sectionHeader:{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10},
  sectionLabel: {color:'#475569', fontSize:12, fontWeight:'800', letterSpacing:1.5},
  pill:         {borderRadius:8, paddingHorizontal:9, paddingVertical:3},
  pillText:     {fontSize:12, fontWeight:'800'},
  sectionSub:   {color:'#94a3b8', fontSize:13, marginBottom:12},

  badgeGrid:   {flexDirection:'row', justifyContent:'space-between', marginBottom:12},
  badgeItem:   {alignItems:'center', flex:1},
  badgeLocked: {opacity:0.45},
  badgeCircle: {width:52, height:52, borderRadius:16, justifyContent:'center', alignItems:'center', marginBottom:7},
  badgeEmoji:  {fontSize:26},
  badgeLabel:  {color:'#334155', fontSize:12, fontWeight:'700', textAlign:'center'},

  // action cards
  actionCard: {borderRadius:18, marginBottom:10, overflow:'hidden', shadowColor:'#000', shadowOpacity:0.06, shadowRadius:8, elevation:3},
  actionGrad: {flexDirection:'row', alignItems:'center', gap:12, padding:14, borderRadius:18, borderWidth:1.5, borderColor:'rgba(0,0,0,0.05)'},
  actionIcon: {width:46, height:46, borderRadius:14, justifyContent:'center', alignItems:'center'},
  actionEmoji:{fontSize:24},
  actionText: {flex:1},
  actionTitle:{fontSize:15, fontWeight:'900', marginBottom:2},
  actionDesc: {fontSize:12, color:'#94a3b8', fontWeight:'500'},
  actionArrow:{width:32, height:32, borderRadius:10, justifyContent:'center', alignItems:'center'},
  arrowText:  {color:'#fff', fontSize:22, fontWeight:'700', lineHeight:28},

  // logout
  logoutBtn:  {marginTop:8, backgroundColor:'#fff', borderRadius:16, paddingVertical:15, alignItems:'center', borderWidth:1.5, borderColor:'#fecdd3'},
  logoutText: {color:'#e11d48', fontSize:15, fontWeight:'800'},

  footer:{color:'#94a3b8', textAlign:'center', fontSize:12, fontWeight:'700', marginTop:16},
});

const m = StyleSheet.create({
  overlay:    {flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center', padding:24},
  sheet:      {width:'100%', borderRadius:28, overflow:'hidden', shadowColor:'#000', shadowOpacity:0.2, shadowRadius:24, elevation:16},
  sheetGrad:  {padding:28, alignItems:'center'},
  iconWrap:   {width:72, height:72, borderRadius:24, backgroundColor:'#fce4ec', justifyContent:'center', alignItems:'center', marginBottom:16},
  iconEmoji:  {fontSize:38},
  title:      {color:'#be123c', fontSize:22, fontWeight:'900', marginBottom:10},
  desc:       {color:'#64748b', fontSize:14, textAlign:'center', lineHeight:22, marginBottom:24},
  confirmWrap:{width:'100%', borderRadius:14, overflow:'hidden', marginBottom:10},
  confirmBtn: {paddingVertical:16, alignItems:'center', borderRadius:14},
  confirmText:{color:'#fff', fontSize:15, fontWeight:'900', letterSpacing:0.5},
  cancelWrap: {paddingVertical:8},
  cancelText: {color:'#94a3b8', fontSize:14, fontWeight:'600'},
});

export default GuvenlikScreen;