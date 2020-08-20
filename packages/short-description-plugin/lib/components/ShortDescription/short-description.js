import React from 'react';
import {bool, shape, string} from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import defaultClasses from './short-description.css';
import RichText from '@magento/venia-ui/lib/components/RichText';
import productOperations from './short-description.gql';


const ShortDescription = props => {
    const { productSku } = props;
    const classes = mergeClasses(defaultClasses);
    const { queries } = productOperations;
    const { getShortDescriptionQuery } = queries;

    const { loading, error, data } = useQuery(getShortDescriptionQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            productSku
        }
    });

    if (loading) {
        // Default content rendered while the query is running
        return <div className={classes.section}>
            <span className={classes.loader}>Loading...</span>
        </div>
    }

    if (error) {
        // NOTE: This is only meant to show WHERE you can handle
        // GraphQL errors. Not HOW you should handle it.
        return <span>Error!</span>;
    }

    const { productDetail } = data;
    const shortDescription = productDetail.items[0].short_description.html

    return (
        <div className={classes.root}>
            <div className={classes.section}>
                <RichText content={shortDescription} />
            </div>
        </div>
    )
};

export default ShortDescription;

ShortDescription.propTypes = {
    classes: shape({
        root: string,
        section: string,
        loader: string
    }),
    productSku: string.isRequired
};
