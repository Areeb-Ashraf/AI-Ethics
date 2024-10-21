import React from 'react'
import '../styles/help.css';
import ModuleBadge from '../styles/Badges/ModuleBadge.svg'
import XPBadge from '../styles/Badges/XPBadge.svg'
import EthicBot from '../styles/Badges/EthicBot.svg'
import VirtueBot from '../styles/Badges/VirtueBot.svg'
import JusticeBot from '../styles/Badges/JusticeBot.svg'

const Help = () => {
  return (
    <div className='help-container'>
      <h1>Help</h1>
      <div className="walkthrough">Here’s a walkthrough of the course</div>
      <div className="help-text">Welcome to your AI Ethics journey! As you progress through each module, you'll have the chance to earn badges that represent your growing expertise. These badges are more than just rewards—they’re symbols of your hard work, dedication, and understanding of AI ethics. By completing modules, acing quizzes, and answering questions quickly, you'll accumulate points, rise through the ranks, and unlock new titles that showcase your accomplishments. Whether you're a Novice just starting out or aiming to become a Master of Integrity, every step you take brings you closer to mastering the ethical principles shaping AI. Keep going—every badge is a testament to your commitment to making the world of AI a better, more responsible space!</div>
      <div className="help-subheading">Badges/symbols</div>
      <table>
        <tr>
            <th className='tbl-hd'>Symbol</th>
            <th className='tbl-hd'>What they are </th>
            <th>How to earn them</th>
        </tr>
        <tr>
            <td><img src={ModuleBadge} alt="ModuleBadge-img" /></td>
            <td>Module Badges</td>
            <td>This badge is earned after successfully completing each modules.</td>
        </tr>
        <tr>
            <td><img src={XPBadge} alt="XPBadge-img" /></td>
            <td>XP Badges</td>
            <td>This badge is given to score each user on the leaderboard. They are earned by taking quizzes and answering each question correctly. You can also get extra points for answering quickly.</td>
        </tr>
        <tr>
            <td><img src={EthicBot} alt="EthicBot-img" /></td>
            <td>EthicBot</td>
            <td>This badge is earned after successfully completing modules 1-3.</td>
        </tr>
        <tr>
            <td><img src={VirtueBot} alt="VirtueBot-img" /></td>
            <td>VirtueBot</td>
            <td>This badge is earned after successfully completing modules 4-6.</td>
        </tr>
        <tr>
            <td><img src={JusticeBot} alt="JusticeBot-img" /></td>
            <td>JusticeBot</td>
            <td>This badge is earned after successfully completing modules 7-10.</td>
        </tr>
      </table>
    
      <div className="help-subheading">Ethical Evolution Milestone</div>
      <div className="milestone-text"><span>Novice:</span> This is the default title after a user creates an account.</div>
      <div className="milestone-text"><span>Ethics Explorer:</span> User unlocks this title when they accumulate 50 XP.</div>
      <div className="milestone-text"><span>AI Learner:</span> User unlocks this title when they accumulate 100 XP.</div>
      <div className="milestone-text"><span>Moral Thinker:</span> User unlocks this title when they accumulate 150 XP.</div>
      <div className="milestone-text"><span>Ethics Analyst:</span> User unlocks this title when they accumulate 250 XP.</div>
      <div className="milestone-text"><span>AI Scholar:</span> User unlocks this title when they accumulate 350 XP.</div>
      <div className="milestone-text"><span>Virtue Advocate:</span> User unlocks this title when they accumulate 500 XP.</div>
      <div className="milestone-text"><span>AI Specialist:</span> User unlocks this title when they accumulate 650 XP.</div>
      <div className="milestone-text"><span>Guardian of Ethics:</span> User unlocks this title when they accumulate 800 XP.</div>
      <div className="milestone-text"><span>Master of Integrity:</span> User unlocks this title when they accumulate 1000 XP.</div>
    </div>
  )
}

export default Help
