export const MOODS = [
  {id: 1, emoji: '😊', label: 'Neşeliyim'},
  {id: 2, emoji: '😢', label: 'Üzgünüm'},
  {id: 3, emoji: '😐', label: 'Kaygılıyım'},
  {id: 4, emoji: '😌', label: 'Huzurluyum'},
  {id: 5, emoji: '😠', label: 'Kızgınım'},
  {id: 6, emoji: '😲', label: 'Şaşkınım'},
  {id: 7, emoji: '🤢', label: 'Tiksiniyorum'},
  {id: 8, emoji: '🙈', label: 'Utanıyorum'},
  {id: 9, emoji: '😱', label: 'Korkuyorum'},
];

export const RUHSAL_SORULAR = [
  {
    id: 1,
    soru: 'Kız/erkek arkadaşlığında ilişkinin sürdürülmesi için, tehdit bir araç olarak kullanılabilir',
    tip: 'likert',
    secenekler: ['Kesin Katılmıyor', 'Katılmıyor', 'Kararsız', 'Katılıyor', 'Kesin Katılıyor'],
  },
  {
    id: 2,
    soru: 'Son iki haftada kendinizi çoğunlukla mutsuz veya umutsuz hissettiniz mi?',
    tip: 'likert',
    secenekler: ['Hiç', 'Birkaç gün', 'Haftanın yarısından fazla', 'Neredeyse her gün'],
  },
  {
    id: 3,
    soru: 'Günlük aktivitelerinizi yaparken kendinizi nasıl hissediyorsunuz?',
    tip: 'likert',
    secenekler: ['Kesin Katılmıyor', 'Katılmıyor', 'Kararsız', 'Katılıyor', 'Kesin Katılıyor'],
  },
];

export const FIZIKSEL_SORULAR = [
  {
    id: 1,
    soru: 'Boyunuz (Lütfen cm cinsinden belirtiniz. 180, 165 vs..)',
    tip: 'text',
    placeholder: 'Lütfen bir cevap yaz',
  },
  {
    id: 2,
    soru: 'Kilonuz (Lütfen kg cinsinden belirtiniz)',
    tip: 'text',
    placeholder: 'Lütfen bir cevap yaz',
  },
  {
    id: 3,
    soru: 'Haftada kaç gün egzersiz yapıyorsunuz?',
    tip: 'likert',
    secenekler: ['Hiç', '1-2 gün', '3-4 gün', '5+ gün'],
  },
];

export const SIKAYET_KATEGORILER = [
  {id: 1, label: 'Kampüs İçi', icon: 'business'},
  {id: 2, label: 'Kampüs Dışı', icon: 'location-off'},
];
