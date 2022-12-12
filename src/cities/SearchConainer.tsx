import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React, {FC, forwardRef, useEffect} from 'react';
import CitySearch from "./CitySearch";
import {useTypeDispatch, useTypedSelector} from "../redux/store";
import {Stack} from "@mui/material";
import {getWishVisitList, setDefaultMainListCityId, setMainListCityId} from "../redux/slices/cities";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

const SearchContainer: FC<{ style: any }> = forwardRef(({style, ...rest}, ref) => {

    const dispatch = useTypeDispatch();

    const wishVisitList = useTypedSelector(getWishVisitList);

    useEffect(() => {
        if (wishVisitList.length === 0) {
            dispatch(setDefaultMainListCityId());
        }
    }, [dispatch, wishVisitList]);


    return (
        <Container>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginTop="24px"
            >
                <CitySearch/>

                {wishVisitList.length !== 0 &&
                    <Button
                        onClick={() => dispatch(setMainListCityId(wishVisitList))}
                        variant="contained"
                        style={{width: 200, marginLeft: 16}}
                    >
                        I want to visit
                    </Button>
                }

            </Stack>
            <Box
                ref={ref}
                style={style}
                {...rest}
            />
        </Container>
    );
});

export default SearchContainer;