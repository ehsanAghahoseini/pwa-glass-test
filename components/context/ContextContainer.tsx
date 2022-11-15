

import React from 'react'
import ContextFavoriteModels from './ContextFavorite';
import ContextCartModels from './ContextCart';
import ContextFilterModels from './ContextFilter';
import ContextAddressModels from './ContextAddress';
import ContextCategoriesModels from "./ContextCategoris";
import ContextChatModels from "./ContextChat";
import ContextFailLoadModels from './ContextFailLoad';

export default function ContextContainer(props: any) {

  return (
    <>
      <ContextFailLoadModels>
          <ContextAddressModels>
            <ContextFilterModels>
              <ContextFavoriteModels>
                <ContextCartModels>
                  <ContextCategoriesModels>
                    <ContextChatModels>
                      {props.children}
                    </ContextChatModels>
                  </ContextCategoriesModels>
                </ContextCartModels>
              </ContextFavoriteModels>
            </ContextFilterModels>
          </ContextAddressModels>
      </ContextFailLoadModels>
    </>
  )
}

