import React from 'react';

import './Home.css';
import Presentation from '../Presentations';
import { TextRight, TextLeft } from '../InfoContainer';
import iMooring from '../../res/mooringline.jpg'
import iProposal from '../../res/Proposal.png'
import iDataPipeline from '../../res/DataPipeline.png'
import iPredictor from '../../res/img/Predictor.png'
import iComparator from '../../res/img/Comparator_Res.png'
import iClassifier from '../../res/img/Classifier_res.png'
import iSimulation from '../../res/img/Simulation.png'

function Home() {

    let tMooring = " <p>Mooring systems give stability to floating platforms against environmental conditions by anchoring the platform with mooring lines attached to the seabed. \
    These systems are among the main components that guarantee the safety of staffs and the various operations carried out on the platforms. </p>\
    <p>Petrobras has many platforms installed, which encompass a large number of mooring lines.\
    Thus, the rapid detection of failure of a mooring system is very important, as this failure can result in damage or loss of property, environmental pollution, personnel endangerment and depending on the severity of failure, in some cases oil production shutdown. </p>"

    let tProposal = "It is assumed that after a Linebreakage the platform motion becomes iregular at least for a short time bevor regulating itself again.\
    Based on this assumption a predictor module based on neural networks was developed with the capability of predicting the platform motion.\
    Sensors measure the motion effectively performed by the platform.\
    The difference between the two signals, predicted and measured, indicates whether or not there was a failure, which is detected by a classifier."

    let tImplementation = "The proposal was implemented in 6 different steps. \
    <ul> \
        <li>The environmental conditions of a platform were meassured over the last 30 years</li> \
        <li>Adequate ambimental conditions were found that could be used for training the algorithm</li> \
        <li>The selected cases were simulated using the Dynasim simulator</li> \
        <li>The algorithm was trained with the simulated platform motions and afterwards tested with other sets of environmental conditions</li> \
        <li>Based on the difference between simulation and prediction error scores were then calculated</li> \
        <li>Based on the error scores a classifier was trained to detect Line Failures</li> \
    </ul> "

    let tSimulation = "As mentioned in the paragraph above the first step was the creation of a representative data base of platform motions. \
    To achieve that the last 30 years of environmental conditions were analysed and a subset was created that had the same environmental characteristics. \
    Based on this subset and on an accurate model of the P50 platform the shipmotion was then simulated using Dynasim. The motions were stored in a database. "

    let tPredictor = "The predictors are neural nets that were trained to predict future platform motions based on the last measured platform motion. \
    Two different neural networks were implemented to predict the ship motion. \
    <ul> \
        <li>The first network was based on MLP units. It consisted of 5 layers and was developed to predict 100 seconds of the platform motion based on the last 400 seconds of platform motion</li> \
        <li>The second network was based on LSTM units and was designed under the encoder decoder principle. The first LSTM layer was trained for extracting important information based on the measured platform motion. \
        The first layer encoded the necesary information and passed them to the second LSTM layer specialized in decoding the information and predicting future ship motions based on the encoded information</li> \
    </ul> "

    let tComparator = " The comparator module took the predicted motion and the simulated motion for the same time span. Based on the difference between prediction and simulation he then calculated error scores. \
    In our case these errors were RMSE, Mean and Median Errors. The results are shown in the graphic were each data point stands for a different comparision between simulation and prediction \
    The different error scores are seperated into different scatter plots. It can be seen that the two cases ( Line failure and no line failure) show different error scores and a visual classification into the two groups is aleady possible."
    let tClassifier = "Based on the by the comparator module calulated error scores the classifier then classified binary if the meassured motion indicated a mooring line failure or not. \
    The results show that for the two different predictor modules high accuracies could be scored."
    return (
        <div>
            <div className='Cover-Container'>
                <h1>Motion prediction</h1>
                <p>Using Machine Learning to detect Mooring Line Failures in real time</p>
            </div>

            <TextLeft header="Mooring Lines" image={iMooring} text={tMooring} Cover />
            <TextRight header="Proposal" image={iProposal} text={tProposal} />
            <TextLeft header="Implementation" image={iDataPipeline} text={tImplementation} />
            <TextRight header="Simulator" image={iSimulation} text={tSimulation} />
            <TextLeft header="Predictor" image={iPredictor} text={tPredictor} />
            <TextRight header="Comparator" image={iComparator} text={tComparator} />
            <TextLeft header="Classifier" image={iClassifier} text={tClassifier} />
            <Presentation />
        </div>


    );
}

export default Home;