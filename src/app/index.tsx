import React, {useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';

const COLORS = {
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text:'#1E293B',
  secondaryText:'#64748B',
  border:'#E2E8F0',
  rock:'#EF4444',
  paper:'#0D9488',
  scissors:'#D97706',
  vs:'#6366F1',
  win:'#0D9488',
  draw:'#D97706',
  loss:'#EF4444',
};
const choices = [
  { name: 'Rock', color: COLORS.rock ,emoji:'✊'},
  { name: 'Paper', color: COLORS.paper ,emoji:'✋'},
  { name: 'Scissors', color: COLORS.scissors ,emoji:'✌️'},
];
export default function PlayScreen() {
  const [userChoice, setUserChoice] = useState<(typeof choices)[number] | null>(null);
  const [computerChoice, setComputerChoice] = useState<(typeof choices)[number] | null>(null);
  const [result, setResult] = useState('Make your move!');
  const [resultcolor, setResultColor] = useState(COLORS.text);
  const [Score, setScore] = useState({win:0,draw:0,loss:0});

  const playGame=(choice:(typeof choices)[number])=>{
  const randomNum=Math.floor(Math.random() * 3);
  const comchoice=choices[randomNum];
  setUserChoice(choice);
  setComputerChoice(comchoice);
  if(choice.name===comchoice.name){
    setResult('Draw! ');
    setResultColor(COLORS.draw);
  } else if(
    (choice.name==='Rock' && comchoice.name==='Scissors') ||
    (choice.name==='Paper' && comchoice.name==='Rock') ||
    (choice.name==='Scissors' && comchoice.name==='Paper')
  ){
    setResult('You win! ');
    setResultColor(COLORS.win);
    setScore(prev=>({...prev, win:prev.win+1}));
  } else {
    setResult('You lose!  ');
    setResultColor(COLORS.loss);
    setScore(prev=>({...prev, loss:prev.loss+1}));
  }
};
   const resetGame=()=>{
    setUserChoice(null);
    setComputerChoice(null);
    setResult('Make your move!');
    setResultColor(COLORS.text);
    setScore({win:0,draw:0,loss:0});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RPS Showdown</Text>
      <Text style={styles.subtitle}>Rock Paper Scissors</Text>

      <View style={styles.scoreboard}>
        <view style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>WINS</Text>
          <Text style={[styles.scoreValue,{color: COLORS.win}]}>{Score.win}</Text>
        </view>
        <view style={styles.scoreDivider}/>
        <view style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>DRAWS</Text>
          <Text style={[styles.scoreValue,{color: COLORS.draw}]}>{Score.draw}</Text>
        </view>
        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>LOSSES</Text>
          <Text style={[styles.scoreValue,{color: COLORS.loss}]}>{Score.loss}</Text>
        </View>
      </View>
      <view style={styles.playersection}>
        <Text style={styles.playerTitle}>You</Text>
        <view style ={[styles.emojiCircle,userChoice && {borderColor:userChoice.color,backgroundColor:'${userChoice.color}15'}]}>
          <Text style={styles.emojiText}>{userChoice?userChoice.emoji:' '}</Text>
        </view>
      </view>
      <view style={styles.vsBadge}>
        <Text style={styles.vsText}>VS</Text>
      </view>
      <view style={styles.playersection}>
        <Text style={styles.playerTitle}>COMPUTER</Text>
        <view style ={[styles.emojiCircle,computerChoice && {borderColor:computerChoice.color,backgroundColor:'${computerChoice.color}15'}]}>
          <Text style={styles.emojiText}>{computerChoice?computerChoice.emoji:' '}</Text>
        </view>
      </view>
    
        <View style={styles.resultContainer,{borderColor:'${resultColor}55'}]}>
          <Text style={[styles.resultText,{color:resultcolor}]}>{result}</Text>
        </View>
      
