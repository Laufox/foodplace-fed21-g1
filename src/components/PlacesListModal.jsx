import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap';
import { useState, useMemo, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import  ListGroup  from 'react-bootstrap/ListGroup'
import FoodPlacesTable from './FoodPlacesTable'
import useGetQueryPlaces from '../hooks/useGetQueryPlaces'
import SearchAddressForm from '../components/SearchAddressForm'
import MapsAPI from '../services/mapsAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const PlacesListModal = ({onFoodItemClick, onAddressFormSubmit}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // What columns table should include
    const columns = useMemo( () => {

        return [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Town',
                accessor: 'town'
            },
            {
                Header: 'Supply',
                accessor: 'supply'
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Cuisine',
                accessor: 'cuisine'
            }
        ]

    }, [] )

    // States for how food places list should be filtered
    const [nameOrder, setNameOrder] = useState('asc')
    const [supplyWhere, setSupplyWhere] = useState('All')
    const [typeWhere, setTypeWhere] = useState('All')
    const [townWhere, setTownWhere] = useState(null)
    const [queryLimits, setQueryLimits] = useState({
        nameOrder,
        supplyWhere,
        typeWhere,
        townWhere,
    })

    // Get list of food places from hook
    const { data, loading } = useGetQueryPlaces(queryLimits)

    // Update query settings
    // const handleFilterPlaces = (town) => {
    //     setQueryLimits({
    //         nameOrder,
    //         supplyWhere,
    //         typeWhere,
    //         townWhere: town,
    //     })
    // }

    /**
     *
     * Function to handle when search form has been submitted
     *
     */
     const handleOnSubmit = async (address) => {

        // If no address has been given, return
        if(!address) {
            return
        }

        // Get only town name from address given
        const town = await MapsAPI.getTown(address)

        // Update states to show only given town
        setTownWhere(town)
        //handleFilterPlaces(town)

        // Let parent component take over
        onAddressFormSubmit(address)

    }

    /**
     *
     * Function to reset current selected town so that all will show in food places list
     *
     */
    const resetTownWhere = () => {
        setTownWhere(null)
        //handleFilterPlaces(null)
    }

    useEffect( () => {

        setQueryLimits({
            nameOrder,
            supplyWhere,
            typeWhere,
            townWhere,
        })

    }, [nameOrder, supplyWhere, typeWhere, townWhere] )

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Places near you
            </Button>

            {
                show && (
                    <div className='foodplace-modal'>
                        <h2>Places near you</h2>
                        <FontAwesomeIcon icon={faXmark} className='foodplace-modal-close' onClick={handleClose} />

                        {
                            loading && (
                                <p>Loading ....</p>
                            )
                        }

                        {
                            data && (
                                <>

                                <label htmlFor='sort-select-type'>Filter by type</label>
                                <select id='sort-select-type' className="form-select" onChange={(e)=>{setTypeWhere(e.target.value)}} defaultValue={typeWhere}>
                                    <option value="All">All types</option>
                                    <option value="Café">Café</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Fast food">Fast food</option>
                                    <option value="Grill">Grill</option>
                                    <option value="Foodtruck">Foodtruck</option>
                                </select>

                                <label htmlFor='sort-select-supply'>Filter by supply</label>
                                <select id='sort-select-supply' className="form-select" onChange={(e)=>{setSupplyWhere(e.target.value)}} defaultValue={supplyWhere}>
                                    <option value="All">All supplies</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="After Work">After Work</option>
                                    <option value="A la Carte">A la carte</option>
                                </select>

                                <label htmlFor='sort-select-name-order'>Sort name: </label>
                                <select id='sort-select-name-order' className="form-select" onChange={(e)=>{setNameOrder(e.target.value)}} defaultValue={nameOrder}>
                                    <option value="asc">Acending</option>
                                    <option value="desc">Descending</option>
                                </select>

                                {/* <Button onClick={() =>{handleFilterPlaces(townWhere)}} className='btn-color my-3'>Filter</Button> */}

                                {/* <FoodPlacesTable foodPlaces={data} onFoodItemClick={onFoodItemClick} columns={columns} /> */}

                                {
                                    townWhere && (
                                        <Button variant='outline-primary' className='townbutton-outline'>{townWhere}
                                            <FontAwesomeIcon icon={faXmark} className='townbutton-close' onClick={resetTownWhere} />
                                        </Button>
                                    )
                                }

                                <SearchAddressForm onSubmit={handleOnSubmit} />

                                <ListGroup className="foodplace-listgroup">

                                    {
                                        data.map((foodplace, index) => (
                                            <ListGroup.Item action key={index} onClick={() => {onFoodItemClick(foodplace)}}>
                                                <h3>{foodplace.name}</h3>
                                                <span>{foodplace.adress + ' ' + foodplace.town}</span>
                                                <br />
                                                <span>{foodplace.supply} | {foodplace.type} | {foodplace.cuisine}</span>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>

                                </>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default PlacesListModal