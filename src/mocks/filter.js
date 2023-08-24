const filterName = [
    `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const generateFilters = () =>{
    return filterName.map((it)=>{
        return {
            name:it,
            count: Math.floor(Math.random() * 10),
        };
    });
};

export {generateFilters};