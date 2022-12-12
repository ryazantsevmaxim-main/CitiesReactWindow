import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import Highlighter from "react-highlight-words";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import {ListChildComponentProps} from "react-window";
import {CityId} from "./types";
import {useTypeDispatch, useTypedSelector} from "../redux/store";
import {
    dontWantToVisitCity,
    getCity,
    getIsWishVisitCity,
    getSearchValue,
    wantToVisitCity
} from "../redux/slices/cities";

// ----------------------------------------------------------------------

interface CityProps extends ListChildComponentProps<CityId[]> {
    style: any
}

// ----------------------------------------------------------------------

const City: FC<CityProps> = ({data, index, style}) => {

    const dispatch = useTypeDispatch();

    const city: any = useTypedSelector(state => getCity(state, data[index]));
    const {id, name, population, country} = city;

    const searchValue = useTypedSelector(getSearchValue);
    const isWishVisitCity = useTypedSelector(state => getIsWishVisitCity(state, id));

    const handleVisit = () => {
        if (isWishVisitCity) {
            dispatch(dontWantToVisitCity({cityId: id}));
        } else {
            dispatch(wantToVisitCity({cityId: id}));
        }
    }

    return (
        <Box
            style={{...style, top: `${parseFloat(style.top) + 100}px`}}
            className="item"
            key={id}
        >
            <Container>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingBottom="10px"
                >
                    <Box>
                        <Typography variant="h4" component="h4">
                            {id}{". "}
                            <Highlighter
                                highlightClassName="search-highlighter"
                                searchWords={[searchValue]}
                                autoEscape={true}
                                textToHighlight={name}
                            />
                        </Typography>
                        <Box>
                            <Typography component="p">
                                <Highlighter
                                    highlightClassName="search-highlighter"
                                    searchWords={[searchValue]}
                                    autoEscape={true}
                                    textToHighlight={population}
                                />
                                {" | "}
                                <Highlighter
                                    highlightClassName="search-highlighter"
                                    searchWords={[searchValue]}
                                    autoEscape={true}
                                    textToHighlight={country}
                                />
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        <Button variant={isWishVisitCity ? "outlined" : "contained"} size="large" onClick={handleVisit}>
                            {isWishVisitCity ?
                                <AddLocationAltIcon/>
                                : <LocationOffIcon/>
                            }
                        </Button>

                    </Box>
                </Box>

                <Divider/>

            </Container>
        </Box>
    );
};

export default City;