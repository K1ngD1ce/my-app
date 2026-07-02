import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import heroContentData from "../../../public/assets/mocks/heroBlock.json";
import { ContentDataType } from "@/widgets/intro-block/lib/types";
import aboutContentData from "../../../public/assets/mocks/aboutBlock.json";
import { AboutDataType } from "@/widgets/about-block/ui/index";
import worksData from "../../../public/assets/mocks/latestWork.json";
import { WorkDataType } from "@/widgets/work-block/lib/types";

export const mockApiSlice = createApi({
  reducerPath: "mockApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getHeroContent: builder.query<ContentDataType, void>({
      queryFn: () => ({ data: heroContentData }),
    }),
    getAboutContent: builder.query<AboutDataType, void>({
      queryFn: () => ({ data: aboutContentData }),
    }),
    getWorks: builder.query<WorkDataType, void>({
      queryFn: () => ({ data: worksData }),
    }),
  }),
});

export const {
  useGetHeroContentQuery,
  useGetAboutContentQuery,
  useGetWorksQuery,
} = mockApiSlice;
