import React, {useState, useRef} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, FlatList, KeyboardAvoidingView,
  Platform, Linking, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// ✅ Otomatik bot cevapları
const BOT_REPLIES = [
  'Anlıyorum, bu konuyu ilgili birime ileteceğiz.',
  'Bilginiz için teşekkür ederiz. En kısa sürede dönüş yapılacaktır.',
  'Şikayetiniz kaydedildi. 48 saat içinde değerlendirilecektir.',
  'Bu konuda size yardımcı olmaya çalışacağız.',
  'Geri bildiriminiz için teşekkür ederiz!',
  'Durumu ilgili departmana ilettik.',
];

const IletisimScreen = () => {
  const [messages, setMessages] = useState([
    {id: '1', text: 'Merhaba! Size nasıl yardımcı olabiliriz?', sender: 'bot'},
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {id: Date.now().toString(), text: input.trim(), sender: 'user'};
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // ✅ Bot otomatik cevap — 800ms sonra
    setTimeout(() => {
      const randomReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const botMsg = {id: (Date.now() + 1).toString(), text: randomReply, sender: 'bot'};
      setMessages(prev => [...prev, botMsg]);
      setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
    }, 800);

    setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
  };

  const renderMessage = ({item}) => (
    <View style={[styles.bubbleRow, item.sender === 'user' ? styles.bubbleRowUser : styles.bubbleRowBot]}>
      {item.sender === 'bot' && (
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>S</Text>
        </View>
      )}
      <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.bubbleText, item.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextBot]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient colors={['#6d1b7b', '#c2185b']} style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>S</Text>
          </LinearGradient>
          <View>
            <Text style={styles.headerTitle}>Bize Yazın</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Çevrimiçi</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://wa.me/')}
          style={styles.whatsappBtn}
          activeOpacity={0.8}>
          <FontAwesome name="whatsapp" size={22} color="#25D366" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({animated: true})}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputArea}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Mesaj yaz..."
              placeholderTextColor="#bbb"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              multiline
            />
          </View>
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.85} style={styles.sendBtnWrap}>
            <LinearGradient colors={['#c2185b', '#e91e8c']} style={styles.sendBtn}>
              <Icon name="send" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, backgroundColor: '#fff'},
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  headerAvatar: {width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center'},
  headerAvatarText: {color: '#fff', fontSize: 20, fontWeight: '900'},
  headerTitle: {fontSize: 16, fontWeight: '900', color: '#880e4f'},
  onlineRow: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2},
  onlineDot: {width: 7, height: 7, borderRadius: 4, backgroundColor: '#43a047'},
  onlineText: {fontSize: 11, color: '#43a047', fontWeight: '700'},
  whatsappBtn: {width: 42, height: 42, borderRadius: 13, backgroundColor: '#f1fdf3', borderWidth: 1.5, borderColor: '#b9f2c5', justifyContent: 'center', alignItems: 'center'},
  divider: {height: 1, backgroundColor: '#f8bbd0'},
  messageList: {padding: 16, paddingBottom: 8},
  bubbleRow: {flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10},
  bubbleRowUser: {justifyContent: 'flex-end'},
  bubbleRowBot:  {justifyContent: 'flex-start', gap: 8},
  botAvatar: {width: 30, height: 30, borderRadius: 10, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center'},
  botAvatarText: {color: '#c2185b', fontSize: 14, fontWeight: '900'},
  bubble: {maxWidth: '75%', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14},
  userBubble: {backgroundColor: '#c2185b', borderBottomRightRadius: 4},
  botBubble: {backgroundColor: '#fff', borderBottomLeftRadius: 4, borderWidth: 1.5, borderColor: '#f8bbd0', shadowColor: '#c2185b', shadowOpacity: 0.06, shadowRadius: 4, elevation: 1},
  bubbleText: {fontSize: 14, lineHeight: 20},
  bubbleTextUser: {color: '#fff', fontWeight: '600'},
  bubbleTextBot:  {color: '#880e4f', fontWeight: '600'},
  inputArea: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#fce4ec', backgroundColor: '#fff'},
  inputWrap: {flex: 1, backgroundColor: '#fafafa', borderRadius: 20, borderWidth: 1.5, borderColor: '#f8bbd0', paddingHorizontal: 16},
  input: {color: '#333', fontSize: 14, paddingVertical: 10, maxHeight: 100},
  sendBtnWrap: {borderRadius: 16, overflow: 'hidden'},
  sendBtn: {width: 44, height: 44, justifyContent: 'center', alignItems: 'center'},
});

export default IletisimScreen;