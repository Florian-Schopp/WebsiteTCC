import React from 'react';
import Card from '@material-ui/core/Card';
import HeightIcon from '@material-ui/icons/Height';
import TimerIcon from '@material-ui/icons/Timer';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import TextField from '@material-ui/core/TextField';

function EnvironmentCondition(props: any) {
    return (
        <Card style={{ padding: '10px' }}>
            <h1 style={{ textAlign: 'center' }}>Wave</h1>
            <div>
                <HeightIcon />
                <TextField id="outlined-basic" label="Height" variant="outlined" value={props.hs1} />
            </div>
            <div>
                <TimerIcon />
                <TextField id="outlined-basic" label="Peak to peak" variant="outlined" value={props.tp1} />
            </div>
            <div>
                <LocationSearchingIcon />
                <TextField id="outlined-basic" label="Direction" variant="outlined" value={props.dir1} />
            </div>
        </Card>
    );
}

export default EnvironmentCondition;