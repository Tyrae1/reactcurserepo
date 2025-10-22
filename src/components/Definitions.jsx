import React from 'react';

function Definitions({data}) {
    return (
        <dl>
            {data.map(({id, dt, dd})=>(
                <React.Fragment key={id}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}
export default Definitions;
