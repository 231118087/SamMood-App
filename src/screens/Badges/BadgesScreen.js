import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useApp} from '../../context/AppContext';

const BadgesScreen = ({navigation}) => {
  const {earnedBadges, BADGES, xp, streak, levelInfo} = useApp();

  const renderBadge = ({item}) => {
    const earned = earnedBadges.includes(item.id);
    return (
      <View style={[styles.badge, !earned && styles.badgeLocked]}>
        <Text style={[styles.badgeIcon, !earned && styles.badgeIconLocked]}>{earned ? item.icon : '🔒'}</Text>
        <Text style={[styles.badgeTitle, !earned && styles.badgeTitleLocked]}>{item.title}</Text>
        <Text style={[styles.badgeDesc, !earned && styles.badgeDescLocked]}>{earned ? item.desc : '???'}</Text>
        <Text style={styles.badgeXp}>+{item.xp} XP</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#5B2D8E', '#3B6FD4']} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🏆 Rozetlerim</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{xp}</Text>
          <Text style={styles.statLabel}>Toplam XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>Sv. {levelInfo.level}</Text>
          <Text style={styles.statLabel}>{levelInfo.title}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>🔥 {streak}</Text>
          <Text style={styles.statLabel}>Gün Serisi</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{earnedBadges.length}/{BADGES.length}</Text>
          <Text style={styles.statLabel}>Rozet</Text>
        </View>
      </View>

      <FlatList
        data={BADGES}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={renderBadge}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 20, padding: 16},
  back: {marginBottom: 8},
  backText: {color: 'rgba(255,255,255,0.7)', fontSize: 16},
  title: {color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16},
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 12, marginBottom: 16},
  statBox: {alignItems: 'center'},
  statValue: {color: '#FFD700', fontSize: 16, fontWeight: 'bold'},
  statLabel: {color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2},
  grid: {paddingBottom: 20},
  badge: {flex: 1, margin: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 16, alignItems: 'center'},
  badgeLocked: {backgroundColor: 'rgba(255,255,255,0.08)'},
  badgeIcon: {fontSize: 36, marginBottom: 8},
  badgeIconLocked: {opacity: 0.4},
  badgeTitle: {color: '#FFD700', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 4},
  badgeTitleLocked: {color: 'rgba(255,255,255,0.4)'},
  badgeDesc: {color: 'rgba(255,255,255,0.8)', fontSize: 11, textAlign: 'center', marginBottom: 4},
  badgeDescLocked: {color: 'rgba(255,255,255,0.3)'},
  badgeXp: {color: '#FFD700', fontSize: 12, fontWeight: 'bold'},
});

export default BadgesScreen;