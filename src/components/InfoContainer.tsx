import './pages/Home.css';
import ComponentProps from 'react';


export const TextRight = (
    props: any
): JSX.Element => {


    return (
        <div className='Column-Container'>
            <div className='Column' >
                {props.Cover ?
                    <img className='ImageCoverColumn' src={props.image} /> :
                    <img className='ImageColumn' src={props.image} />}

            </div>
            <div className='Column'>
                <h1>{props.header}</h1>
                <div className="Body" dangerouslySetInnerHTML={{ __html: props.text }}>
                </div>

            </div>
        </div >
    )
}

export const TextLeft = (
    props: any
): JSX.Element => {


    return (
        <div className='Column-Container'>
            <div className='Column'>
                <h1>{props.header}</h1>
                <div className="Body" dangerouslySetInnerHTML={{ __html: props.text }}>
                </div>

            </div>
            <div className='Column' >
                {props.Cover ?
                    <img className='ImageCoverColumn' src={props.image} /> :
                    <img className='ImageColumn' src={props.image} />}
            </div>

        </div >
    )
}

export default TextRight;