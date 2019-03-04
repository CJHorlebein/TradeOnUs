export let box = {
    margin: '0 auto',
}

export let header = {
    fontSize: '3.5rem',
    color: '#15232D',
    margin: '0 auto',
    textAlign: 'center'
};

export let subHeader = {
    fontSize: '2rem',
    color: '#444F57',
    margin: '0 auto .5em',
    textAlign: 'center'
};

export let formField = {
    width: '40em',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 1em',
    flexWrap: 'wrap'
};

export let nameFields = {
    width: '40em',
    display: 'flex',
    justifyContent: 'space-between',
};

export let field ={
    fontSize: '1rem',
    marginBottom: '1em',
    padding: '.5em .8em',
    border: '1px solid #A7B6BC',
    borderRadius: '4px',
    boxShadow: '1px 1px 2px #888888',
    width: '100%'     
};

export let nameField = {
    ...field,
    width: '45%'
};

export let button = {
    ...field,
    backgroundColor: '#636C73',
    border: 'solid 1px #15232D',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '.7em .7em',
}
