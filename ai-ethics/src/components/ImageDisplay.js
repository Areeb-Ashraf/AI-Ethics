


import React from 'react';
import Data1 from './quizImages/DataConsent1.png'
import Data2 from './quizImages/DataConsent2.png'
import Data3 from './quizImages/DataConsent3.png'
import Data4 from './quizImages/DataConsent4.png'
import Data5 from './quizImages/DataConsent5.png'
import Accessibility1 from './quizImages/Accessibility1.png'
import Accessibilty2 from './quizImages/Accessiblity2.png'
import UserAutonomy1 from './quizImages/UserAutonomy1.png'
import UserAutonomy2 from './quizImages/UserAutonomy2.png'
import SocialImpact1 from './quizImages/SocialImpact1.png'
import SocialImpact2 from './quizImages/SocialImpact2.png'
import Transparency1 from './quizImages/Transparency1.png'
import Transparency2 from './quizImages/Transparency2.png'
import Transparency3 from './quizImages/Transparency3.png'
import Transparency4 from './quizImages/Transparency4.png'
import Accountability1 from './quizImages/Accountability1.png'
import Accountability2 from './quizImages/Accountability2.png'
import Privacy1 from './quizImages/Privacy1.png'
import Privacy2 from './quizImages/Privacy2.png'
import Privacy3 from './quizImages/Privacy3.png'
import Privacy4 from './quizImages/Privacy4.png'
import Privacy5 from './quizImages/Privacy5.png'
import Diversity1 from './quizImages/Diversity1.png'
import Diversity2 from './quizImages/Diversity2.png'
import Diversity3 from './quizImages/Diversity3.png'


const ImageDisplay = ({ quizID, currentQuestionID }) => {
    console.log("quizID:", quizID); // Log the quizID
    console.log("currentQuestionID:", currentQuestionID); // Log the currentQuestionID
  
    if (quizID === "ModuleOne" && currentQuestionID === 79) {
      return (
        <img
          src={Data1}
          alt="Data1"
          style={{
            width: "800px",
            height: "800px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleOne" && currentQuestionID === 80) {
      return (
        <img
          src={Data2}
          alt="Data1"
          style={{
            width: "800px",
            height: "800px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleOne" && currentQuestionID === 81) {
      return (
        <img
          src={Data3}
          alt="Data1"
          style={{
            width: "800px",
            height: "800px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleOne" && currentQuestionID === 82) {
      return (
        <img
          src={Data4}
          alt="Data1"
          style={{
            width: "800px",
            height: "800px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleOne" && currentQuestionID === 83) {
      return (
        <img
          src={Data5}
          alt="Data1"
          style={{
            width: "800px",
            height: "800px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleTwo" && currentQuestionID === 83) {
      return (
        <img
          src={Accessibility1}
          alt="Accessibility1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleTwo" && currentQuestionID === 84) {
      return (
        <img
          src={Accessibilty2}
          alt="Accessibilty2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleThree" && currentQuestionID === 101) {
      return (
        <img
          src={UserAutonomy1}
          alt="UserAutonomy1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleThree" && currentQuestionID === 102) {
      return (
        <img
          src={UserAutonomy2}
          alt="UserAutonomy2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFour" && currentQuestionID === 128) {
      return (
        <img
          src={SocialImpact1}
          alt="SocialImpact1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFour" && currentQuestionID === 129) {
      return (
        <img
          src={SocialImpact2}
          alt="SocialImpact2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFive" && currentQuestionID === 92) {
      return (
        <img
          src={Transparency1}
          alt="Transparency1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFive" && currentQuestionID === 93) {
      return (
        <img
          src={Transparency2}
          alt="Transparency2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFive" && currentQuestionID === 94) {
      return (
        <img
          src={Transparency3}
          alt="Transparency3"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleFive" && currentQuestionID === 95) {
      return (
        <img
          src={Transparency4}
          alt="Transparency4"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSix" && currentQuestionID === 61) {
      return (
        <img
          src={Accountability1}
          alt="Accountability1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSix" && currentQuestionID === 62) {
      return (
        <img
          src={Accountability2}
          alt="Accountability2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSeven" && currentQuestionID === 80) {
      return (
        <img
          src={Privacy1}
          alt="Privacy1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSeven" && currentQuestionID === 81) {
      return (
        <img
          src={Privacy2}
          alt="Privacy2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSeven" && currentQuestionID === 82) {
      return (
        <img
          src={Privacy3}
          alt="Privacy3"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSeven" && currentQuestionID === 83) {
      return (
        <img
          src={Privacy4}
          alt="Privacy4"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleSeven" && currentQuestionID === 84) {
      return (
        <img
          src={Privacy5}
          alt="Privacy5"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleEight" && currentQuestionID === 101) {
      return (
        <img
          src={Diversity1}
          alt="Diversity1"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleEight" && currentQuestionID === 102) {
      return (
        <img
          src={Diversity2}
          alt="Diversity2"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }
    if (quizID === "ModuleEight" && currentQuestionID === 103) {
      return (
        <img
          src={Diversity3}
          alt="Diversity3"
          style={{
            width: "600px",
            height: "600px",
            objectFit: "contain",
            borderRadius: "8px",
             marginLeft: "12px"
          }}
        />
      );
    }

  
    return null;
  };
  

export default ImageDisplay;