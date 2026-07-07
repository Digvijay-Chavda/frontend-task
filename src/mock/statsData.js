import group91 from '../assets/Group 91.png'
import group92 from '../assets/Group 92.png'
import group93 from '../assets/Group 93.png'
import group94 from '../assets/Group 94.png'

export const campaignOverview = [
  { label: 'New Leads', value: 1628, sub: null, color: '#7367F0' },
  { label: 'Invites Sent', value: 988, sub: '61%', color: '#B9C2D0' },
  { label: 'Invites Accepted', value: 507, sub: '49%', color: '#C9EBD7' },
  { label: 'Messages Sent', value: 460, sub: '91%', color: '#E3F1C4' },
  { label: 'Replies', value: 202, sub: '44%', color: '#DDEFC9' },
]

export const replyAnalysis = {
  percent: 80,
  label: 'Discussions',
  breakdown: [
    { label: 'Positive', value: 12, color: '#7367F0' },
    { label: 'Neutral', value: 14, color: '#FF9F43' },
    { label: 'Negative', value: 8, color: '#EA5455' },
  ],
}

export const campaignActions = [
  { label: 'Remaining Leads', value: 110 },
  { label: 'Follow-up message', value: 10 },
  { label: 'InMails Sent', value: 20 },
  { label: 'Emails', value: 89 },
  { label: 'Profile Viewed', value: 45 },
  { label: 'Profile Followed', value: 140 },
  { label: 'Skills Endorsed', value: 50 },
  { label: 'Comments Added', value: 54 },
]

export const replyPerformance = [
  { label: 'Follow-up', value: 80, color: '#7367F0' },
  { label: 'InMail', value: 32, color: '#28C76F' },
  { label: 'Email', value: 11, color: '#EA5455' },
  { label: 'Connection Message', value: 79, color: '#3666EE' },
]

export const recentActivity = [
  { time: '09:14 AM', title: 'Campaign started', prefix: 'by', name: 'Aman S.', linked: true, icon: group91 },
  { time: '10:30 AM', title: 'Reply received', prefix: 'from', name: 'Suresh K.', linked: true, icon: group92 },
  { time: '10:35 AM', title: 'Follow-up message sent', prefix: 'by', name: 'System', linked: false, icon: group93 },
  { time: '10:35 AM', title: 'Connection accepted', prefix: 'by', name: 'Suresh K.', nameSuffix: '(Prospect)', linked: true, icon: null },
  { time: '10:45 AM', title: 'Campaign paused', prefix: 'by', name: 'Aman S.', linked: true, icon: group94 },
]
