import React, { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SingleProductHead from "../../../../components/singleProductComponents/SingleProductHead";
import SingleProductDetail from "../../../../components/singleProductComponents/SingleProductDetail";
import SingleProductReviews from "../../../../components/singleProductComponents/SingleProductReviws";
import SingleProductRelated from "../../../../components/singleProductComponents/SingleProductRelated";
import { ProductsDetailsApi, ProductsDetailsCommentsApi } from "../../../../apis/products-api/products-api";
import { MetaModel, PaginingModel } from "../../../../types/models/pagining.types";
import LiveChatBox from "../../../../components/chat/liveChatBox";
import { RelatedProductsApi } from "../../../../apis/shops-api/shops-api";
import Head from "next/head";
import NotFound from "../../../../components/notFoundComponent/NotFound";


const Index: any = (props: { productData: any, RelatedProductData: any, ProductCommentsData: any }) => {
    const routing: any = useRouter();
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(true)
    const [isChatVis, setIsChatVis] = useState<boolean>(false)
    const [notFoundProduct, setNotFoundProduct] = useState<boolean>(false)
    const [isEmptyListRelated, setIsEmptyListRelated] = useState<boolean>(false)
    const [product, setProduct] = useState<any>({})
    const [relatedProducts, setRelatedProducts] = useState<any[]>([])
    const [productComments, setProductComments] = useState<any[]>([])
    const [selectedChild, setSelectedChild] = useState<any>(null)
    const [pageState, setPageState] = useState<number>(1)
    const [ogUrl, setOgUrl] = useState<string>("")
    const [openCollapsReview, setOpenCollapsReview] = useState<number>(0)
    const [metaPage, setMetaPage] = useState<MetaModel>();
    const [childrenExistCard, setChildrenExistCard] = useState<any>({})


    async function getProductsDetailsData({ slug }: any) {
        setDisplaySkelton(true)
        try {
            const res = await ProductsDetailsApi({ slug: slug })
            setSelectedChild(+Object.keys(res.children)[0])
            setProduct(res)
            await getRelatedProductsData({ slug: res.shop.slug, category: res.category, brand: res.brand.name, product: res })
            setDisplaySkelton(false)
        }
        catch (err: any) {
            setNotFoundProduct(true)
        }
    }

    async function getRelatedProductsData({ slug, category, brand, product }: any) {
        setDisplaySkelton(true)
        try {
            const res: PaginingModel = await RelatedProductsApi({ slug: slug, pageState: pageState, parms: `category=${category}&brand=["${brand}"]` })
            let arr = [...res.data]
            var i: any
            for (i in arr) {
                if (arr[i].slug === product.slug) {
                    arr.splice(i, 1)
                }
            }
            if (arr.length === 0) setIsEmptyListRelated(true)
            setRelatedProducts(arr)
            setDisplaySkelton(false)
        }
        catch {
            setDisplaySkelton(false)
        }
    }

    async function getProductsDetailsCommentsData({ slug, pageState }: any) {
        setDisplaySkelton(true)
        try {
            const res = await ProductsDetailsCommentsApi({ slug: slug, pageState: pageState })
            setDisplaySkelton(false)
            setProductComments(res.data)
        }
        catch {
            setDisplaySkelton(false)
        }
    }

    const getIniData = async (props: { slug: string }) => {
        await getProductsDetailsData({ slug: props.slug })
        await getProductsDetailsCommentsData({ slug: props.slug, pageState: 1 })
    }

    useEffect(() => {
        const slug = routing.query.id.substr(3)
        if (slug) getIniData({ slug: slug })
        const href = window.location.href
        href && setOgUrl(href)
    }, [routing.query.slug])


    return (
        <>
            <Head>
                <title>{product.title} - {product.brand?.name}  | optics4less</title>
                <meta property={"og:image"} content={"/assets/about-logo.png"} />
                <meta property={"og:title"}
                    content={`${product.title} | optics4less`} />
                <meta property={"og:url"} content={ogUrl} />
                <meta property={"og:type"} content={"website"} />
                <meta property={"og:description"}
                    content={`${product.slug} | ${product.description}`} />
            </Head>
            {notFoundProduct == false ?
                <div key={"review"} className="w-full max-w-[1200px] m-auto flex pt-[30px] justify-center flex-wrap ">
                    <SingleProductHead item={product} slug={product.shop?.slug} isChatVis={isChatVis} setIsChatVis={setIsChatVis} review={product && product.shop?.review} shopLogo={product && product.shop?.logo} shopName={product && product.shop?.name} />
                    <SingleProductDetail
                        setOpenCollapsReview={setOpenCollapsReview}
                        displaySkelton={displaySkelton}
                        setSelectedChild={setSelectedChild}
                        selectedChild={selectedChild}
                        item={product}
                    />
                    <SingleProductReviews
                        openCollapsReview={openCollapsReview} setOpenCollapsReview={setOpenCollapsReview}
                        getNextPage={(page: number) => getProductsDetailsCommentsData({ slug: routing.query.slug, pageState: page })}
                        metaPage={metaPage} pageState={pageState} setPageState={setPageState} comments={productComments && productComments}
                        displaySkelton={displaySkelton} />
                    <SingleProductRelated isTargetBlank={true} isEmptyList={isEmptyListRelated} products={relatedProducts} />
                    <LiveChatBox isVis={isChatVis} setIsVis={setIsChatVis} productData={[]} shopData={product && product.shop} />
                </div>
                :
                <NotFound />
            }
        </>
    )
}

export async function getServerSideProps(context: any) {
    const slug = context.params.slug;


    return { props: { productData: context.params.slug } }
}

export default Index;

