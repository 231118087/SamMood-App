import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useApp} from '../../context/AppContext';

const SonucScreen = ({navigation}) => {
  const {surveyResults} = useApp();

  const mockResults = surveyResults.length > 0 ? surveyResults : [
    {anket: 'Genel Sağlık', puan: 4.0, sonuc: 'Kötü', tarih: '11/05/2023'},
  ];

  const getScoreColor = puan => {
    if (puan >= 7) return {color: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7'};
    if (puan >= 4) return {color: '#f57c00', bg: '#fff3e0', border: '#ffcc80'};
    return {color: '#c2185b', bg: '#fce4ec', border: '#f48fb1'};
  };

  const renderResult = ({item}) => {
    const sc = getScoreColor(item.puan);
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardIconWrap}>
            <Text style={styles.cardIcon}>📊</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardAnket}>{item.anket}</Text>
            <Text style={styles.cardTarih}>📅 {item.tarih}</Text>
          </View>
          <View style={[styles.scoreBadge, {backgroundColor: sc.bg, borderColor: sc.border}]}>
            <Text style={[styles.scoreText, {color: sc.color}]}>{item.puan}</Text>
          </View>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardBottom}>
          <View style={[styles.sonucBadge, {backgroundColor: sc.bg, borderColor: sc.border}]}>
            <Text style={[styles.sonucText, {color: sc.color}]}>
              {item.sonuc || 'Tamamlandı'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>📥 Sonuçlarım</Text>
      </View>

      {/* Summary card */}
      <LinearGradient
        colors={['#6d1b7b', '#c2185b', '#e91e8c']}
        style={styles.summaryCard}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
        <View style={styles.summaryCircle} />
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryLabel}>Toplam Anket</Text>
          <Text style={styles.summaryNum}>{mockResults.length}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRight}>
          <Text style={styles.summaryLabel}>Son Anket</Text>
          <Text style={styles.summaryDate}>{mockResults[mockResults.length - 1]?.tarih || '-'}</Text>
        </View>
      </LinearGradient>

      <Text style={styles.fieldLabel}>ANKETLERİM</Text>

      <FlatList
        data={mockResults}
        renderItem={renderResult}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Text style={styles.footer}>🎓 Samsun Üniversitesi © 2025</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},

  topNav: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16},
  backBtn: {backgroundColor: '#fce4ec', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8},
  backBtnText: {color: '#c2185b', fontSize: 13, fontWeight: '800'},
  pageTitle: {fontSize: 20, fontWeight: '900', color: '#880e4f'},

  summaryCard: {marginHorizontal: 20, borderRadius: 22, padding: 22, flexDirection: 'row', alignItems: 'center', marginBottom: 24, overflow: 'hidden'},
  summaryCircle: {position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.08)', top: -30, right: -30},
  summaryLeft: {flex: 1, alignItems: 'center'},
  summaryRight: {flex: 1, alignItems: 'center'},
  summaryDivider: {width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)'},
  summaryLabel: {color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 4},
  summaryNum: {color: '#fff', fontSize: 32, fontWeight: '900'},
  summaryDate: {color: '#fff', fontSize: 14, fontWeight: '800'},

  fieldLabel: {color: '#c2185b', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12, paddingHorizontal: 20},

  list: {paddingHorizontal: 20, paddingBottom: 20},

  card: {backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 12, borderWidth: 1.5, borderColor: '#f8bbd0', shadowColor: '#c2185b', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  cardTop: {flexDirection: 'row', alignItems: 'center', gap: 12},
  cardIconWrap: {width: 48, height: 48, borderRadius: 14, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  cardIcon: {fontSize: 24},
  cardInfo: {flex: 1},
  cardAnket: {fontSize: 15, fontWeight: '900', color: '#880e4f', marginBottom: 3},
  cardTarih: {fontSize: 12, color: '#aaa', fontWeight: '600'},
  scoreBadge: {borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1.5},
  scoreText: {fontSize: 18, fontWeight: '900'},
  cardDivider: {height: 1, backgroundColor: '#fce4ec', marginVertical: 12},
  cardBottom: {flexDirection: 'row', alignItems: 'center'},
  sonucBadge: {borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1.5},
  sonucText: {fontSize: 13, fontWeight: '800'},

  footer: {color: '#ccc', textAlign: 'center', fontSize: 13, fontWeight: '700', paddingVertical: 16},
});

export default SonucScreen;