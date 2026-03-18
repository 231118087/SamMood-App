
import React, {createContext, useState, useContext} from 'react';

const AppContext = createContext();

const BADGES = [
  {id: 'first_login', title: 'İlk Adım', desc: 'Uygulamaya ilk kez giriş yaptın', icon: '🌟', xp: 10},
  {id: 'first_mood', title: 'Duygunu Paylaştın', desc: 'İlk modunu kaydettın', icon: '😊', xp: 15},
  {id: 'streak_3', title: '3 Günlük Seri', desc: '3 gün üst üste giriş yaptın', icon: '🔥', xp: 30},
  {id: 'streak_7', title: 'Haftalık Kahraman', desc: '7 gün üst üste giriş yaptın', icon: '💪', xp: 70},
  {id: 'mood_10', title: 'Duygu Ustası', desc: '10 kez mood kaydettın', icon: '🧠', xp: 50},
  {id: 'mood_5', title: 'Duygu Kaşifi', desc: '5 kez mood kaydettın', icon: '🗺️', xp: 25},
  {id: 'wellbeing', title: 'İyi Oluş Yolcusu', desc: 'İyi Oluş bölümünü ziyaret ettin', icon: '🧘', xp: 20},
];

const getLevel = (xp) => {
  if (xp < 50) return {level: 1, title: 'Başlangıç', next: 50};
  if (xp < 150) return {level: 2, title: 'Gelişiyor', next: 150};
  if (xp < 300) return {level: 3, title: 'İlerliyor', next: 300};
  if (xp < 500) return {level: 4, title: 'Uzman', next: 500};
  return {level: 5, title: 'Usta', next: 999};
};

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(null);
  const [surveyResults, setSurveyResults] = useState([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [moodCount, setMoodCount] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [lastBadge, setLastBadge] = useState(null);

  const awardBadge = (badgeId, currentXp, currentBadges) => {
    if (currentBadges.includes(badgeId)) return currentXp;
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return currentXp;
    setEarnedBadges(prev => [...prev, badgeId]);
    setLastBadge(badge);
    setTimeout(() => setLastBadge(null), 3000);
    return currentXp + badge.xp;
  };

  const login = (studentNo, age, gender) => {
    setUser({studentNo, age, gender});
    let newXp = xp + 10;
    const newBadges = [...earnedBadges];
    if (!newBadges.includes('first_login')) {
      newXp = awardBadge('first_login', newXp, newBadges);
    }
    setXp(newXp);
    setStreak(prev => prev + 1);
    if (streak + 1 >= 7 && !earnedBadges.includes('streak_7')) {
      awardBadge('streak_7', newXp, [...newBadges, 'first_login']);
    } else if (streak + 1 >= 3 && !earnedBadges.includes('streak_3')) {
      awardBadge('streak_3', newXp, [...newBadges, 'first_login']);
    }
  };

  const logout = () => {
    setUser(null);
    setMood(null);
  };

  const selectMood = (selectedMood) => {
    setMood(selectedMood);
    const newCount = moodCount + 1;
    setMoodCount(newCount);
    let newXp = xp + 10;
    if (!earnedBadges.includes('first_mood')) {
      newXp = awardBadge('first_mood', newXp, earnedBadges);
    } else if (newCount >= 10 && !earnedBadges.includes('mood_10')) {
      newXp = awardBadge('mood_10', newXp, earnedBadges);
    } else if (newCount >= 5 && !earnedBadges.includes('mood_5')) {
      newXp = awardBadge('mood_5', newXp, earnedBadges);
    }
    setXp(newXp);
  };

  const visitWellbeing = () => {
    if (!earnedBadges.includes('wellbeing')) {
      const newXp = awardBadge('wellbeing', xp, earnedBadges);
      setXp(newXp);
    }
  };

  const addSurveyResult = (result) => {
    setSurveyResults(prev => [...prev, result]);
  };

  const levelInfo = getLevel(xp);

  return (
    <AppContext.Provider
      value={{
        user, mood, surveyResults,
        xp, streak, moodCount, earnedBadges, lastBadge, levelInfo,
        BADGES,
        login, logout, selectMood, addSurveyResult, visitWellbeing,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);