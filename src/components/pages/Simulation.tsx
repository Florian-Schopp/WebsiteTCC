import React, { useEffect, useState } from 'react';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import HeightIcon from '@material-ui/icons/Height';
import TimerIcon from '@material-ui/icons/Timer';
import SpeedIcon from '@material-ui/icons/Speed';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import WaveCondition from '../WaveCondition'
import moment from 'moment';
import './Simulation.css'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from '@material-ui/pickers';
import { DriveEtaTwoTone, Label } from '@material-ui/icons';


interface ICondition {
    hs1: string,
    tp1: string,
    dir1: string,
    hs2: string,
    tp2: string,
    dir2: string,
    vento_vel: string,
    vento_dir: string,
    corr_vel: string,
    corr_dir: string,


}
interface IError {
    RMSE: any[],
    Mean: any[],
    Median: any[],


}

const Simulation = () => {


    const apiUrl = 'http://0.0.0.0:9999/api/v1/';
    const [loading, setLoading] = useState(false);
    const [simulations, setSimulations] = useState<any[]>([]);
    const [simulationName, setSimulationName] = useState('');
    const [predictors, setPredictors] = useState<any[]>([]);
    const [predictorName, setPredictorName] = useState('');
    const [Condition, setCondition] = useState<ICondition[]>([]);
    const [Error, setError] = useState<IError>({
        RMSE: [],
        Mean: [],
        Median: [],
    });
    const [ErrorName, setErrorName] = useState('RMSE');
    const [SimImage, SetSimImage] = useState('');
    const [Dates, setDates] = useState({
        minDate: new Date('2000-01-01T00:00:00'),
        maxDate: new Date('2020-01-01T00:00:00'),
    });

    const getPredictorOption = function (X: any) {
        return <MenuItem key={X} value={X}>{X}</MenuItem>;
    };
    const getLineOption = function (X: any) {
        return <MenuItem key={X[0]} value={X[0]}>{X[0]}</MenuItem>;
    };
    const getErrorValues = function (X: any, index: number) {
        return <TextField style={{ margin: '20px' }} label={("Feature " + (index + 1))} id="outlined-basic" variant="outlined" value={X}></TextField>;
    };

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSubmit = (event: any) => {
        setLoading(true);
        axios.get(apiUrl + 'simulation/create', { params: { date: selectedDate, type: simulationName, predictor: predictorName } })
            .then((res) => {

                SetSimImage(apiUrl + 'simulation/img/' + res.data.ReqID);
                setError(res.data.errors);
                setCondition(res.data.condition);
                setLoading(false);
            });
    };
    const showDialog = (event: any) => {
        setCondition([])
    };

    const onTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as string;
        var startDate = moment(simulations[event.target.value as any]["start"], "DD.MM.YYYY");
        var endDate = moment(simulations[event.target.value as any]["end"], "DD.MM.YYYY");
        setSimulationName(val)
        setDates({ minDate: startDate.toDate(), maxDate: endDate.toDate() })
        setSelectedDate(startDate.toDate())

    };
    const onPredictorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as string;
        setPredictorName(val);

    };
    const onErrorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as string;
        if (!(val in Error)) return;
        setErrorName(val);

    };

    useEffect(() => {
        setLoading(true);
        axios.get(apiUrl + 'simulations/all').then((res) => {
            setSimulations(res.data.cases);
            setPredictors(res.data.predictors);
            setPredictorName(res.data.predictors[0]);
            const val = "new" as any;
            var startDate = moment(res.data.cases[val]["start"], "DD.MM.YYYY");
            var endDate = moment(res.data.cases[val]["end"], "DD.MM.YYYY");
            setSimulationName(val)
            setDates({ minDate: startDate.toDate(), maxDate: endDate.toDate() })
            setSelectedDate(startDate.toDate())
            setLoading(false);
        });
    }, [setLoading]);

    return (
        <div className='ContentContainer'>
            <>
                {Condition[0] ?
                    <>
                        <IconButton aria-label="delete" onClick={showDialog} style={{ width: '100px' }}>
                            <CancelRoundedIcon fontSize="large" />
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'space-around' }}>
                            <Card style={{ padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Wave</h1>
                                <div style={{ margin: '10px 10px ' }}>
                                    <HeightIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Height" variant="outlined" value={Condition[0].hs1} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>
                                    <TimerIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Peak to peak" variant="outlined" value={Condition[0].tp1} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>
                                    <LocationSearchingIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Direction" variant="outlined" value={Condition[0].dir1} />
                                </div>
                            </Card>
                            <Card style={{ padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Swell</h1>
                                <div style={{ margin: '10px 10px ' }}>
                                    <HeightIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Height" variant="outlined" value={Condition[0].hs2} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>
                                    <TimerIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Peak to Peak" variant="outlined" value={Condition[0].tp2} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>
                                    <LocationSearchingIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Direction" variant="outlined" value={Condition[0].dir2} />
                                </div>

                            </Card>
                            <Card style={{ padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Wind</h1>
                                <div style={{ margin: '10px 10px ' }}>

                                    <LocationSearchingIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Direction" variant="outlined" value={Condition[0].vento_dir} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>
                                    <SpeedIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Velocity" variant="outlined" value={Condition[0].vento_vel} />
                                </div>
                            </Card>
                            <Card style={{ padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Current</h1>
                                <div style={{ margin: '10px 10px ' }}>
                                    <LocationSearchingIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Direction" variant="outlined" value={Condition[0].corr_dir} />
                                </div>
                                <div style={{ margin: '10px 10px ' }}>

                                    <SpeedIcon style={{ margin: '15px 10px 0px 0px' }} />
                                    <TextField id="outlined-basic" label="Velocity" variant="outlined" value={Condition[0].corr_vel} />
                                </div>
                            </Card>
                        </div>
                        <div style={{ margin: '30px', display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <Card style={{ width: '600px', padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Predictor</h1>
                                <CardMedia
                                    style={{ height: 0, paddingTop: '56.25%', backgroundSize: 'Contain', margin: '10px' }}
                                    image={SimImage}
                                    title="Predictor Result"
                                />
                            </Card>
                            <Card style={{ width: '300px', padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Comparator</h1>
                                <div>
                                    <Select style={{ margin: '20px' }}
                                        id="demo-simple-select-outlined"
                                        label="Error Index"
                                        onChange={onErrorChange}
                                        value={ErrorName}>
                                        <MenuItem key='RMSE' value='RMSE'>RMSE</MenuItem>
                                        <MenuItem key='Mean' value='Mean'>Mean</MenuItem>
                                        <MenuItem key='Median' value='Median'>Median</MenuItem>
                                    </Select>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                    {Error[ErrorName as keyof typeof Error].map(getErrorValues)}
                                </div>
                            </Card>
                            <Card style={{ width: '300px', padding: '10px' }}>
                                <h1 style={{ textAlign: 'center' }}>Classifier</h1>
                                <TextField style={{ margin: '20px' }} id="outlined-basic" label="KNN" variant="outlined" value={(simulationName == "new" ? "not broken" : "broken")} />
                                <TextField style={{ margin: '20px' }} id="outlined-basic" label="DT" variant="outlined" value={(simulationName == "new" ? "not broken" : "broken")} />
                                <TextField style={{ margin: '20px' }} id="outlined-basic" label="SVC" variant="outlined" value={(simulationName == "new" ? "not broken" : "broken")} />
                            </Card>
                        </div>
                    </>
                    :
                    loading ?
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'space-around' }}>
                                <CircularProgress size='100px' />
                            </div>
                        </> :
                        <>
                            <Card className='SelectContainer'>
                                <FormControl>
                                    <FormControl className='SelectForm' variant="outlined" style={{ margin: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Predictor</InputLabel>
                                        <Select
                                            onChange={onPredictorChange}
                                            id="demo-simple-select-outlined"
                                            label="Predictor"
                                            value={predictorName}>
                                            {predictors.map(getPredictorOption)}
                                        </Select>
                                    </FormControl>
                                    <FormControl className='SelectForm' variant="outlined" style={{ margin: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            onChange={onTypeChange}
                                            id="demo-simple-select-outlined"
                                            label="Line"
                                            value={simulationName}>
                                            {Object.entries(simulations).map(getLineOption)}
                                        </Select>
                                    </FormControl>
                                    <div className='SelectForm'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                minDate={Dates.minDate}
                                                maxDate={Dates.maxDate} />
                                            <TimePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                minutesStep={60}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <Button style={{ margin: '40px 10px 10px 10px' }} variant="contained" color="primary" onClick={handleSubmit}>
                                        Generate
                                </Button>
                                </FormControl>
                            </Card></>}

            </>

        </div >


    );
};
export default Simulation;