import './title.css';

const Title = ({ title, addTitle, addHandler }) => {

    return (
        <div className='heading-container'>
            <h2>{title}</h2>
            <div>
                <button className="add-product-btn" onClick={addHandler}>
                    {addTitle}
                </button>
            </div>
        </div>
    )
}


export default Title;
