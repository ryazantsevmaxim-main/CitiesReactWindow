import React, {memo} from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import City from './City';
import {useTypedSelector} from "../redux/store";
import {getMainList} from "../redux/slices/cities";
import {FixedSizeList} from 'react-window';
import SearchContainer from "./SearchConainer";

// ----------------------------------------------------------------------

const Cities = () => {
    const mainListCityId = useTypedSelector(getMainList);

    return (
        <AutoSizer>
            {({height, width}) => (
                <FixedSizeList
                    className="List"
                    height={height}
                    itemCount={mainListCityId?.length}
                    itemSize={120}
                    width={width}
                    itemData={mainListCityId}
                    innerElementType={SearchContainer}
                >
                    {City}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
};

export default memo(Cities);