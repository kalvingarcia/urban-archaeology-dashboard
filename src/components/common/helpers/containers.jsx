import React, {useContext, createContext} from 'react';

const ContainerContext = createContext("surface");

export function useContainerContext() {
    return useContext(ContainerContext);
}

export function ContainerContextProvider({container, children}) {
    return (
        <ContainerContext.Provider value={container}>
            {children}
        </ContainerContext.Provider>
    )
}