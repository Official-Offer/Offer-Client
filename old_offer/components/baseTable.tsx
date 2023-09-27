          {/* {placeholders?.map((value:string, index:number) => (
            <FilterSearch
              searchResults={searchResults[index+1]}
              placeholder={value}
              onSearch={(value: any) => {
                handleFilterSearch(value, filterTypes[index]);
              }}
              // options={dataset.map((item) => item.name)}
            />
          ))} */}

            //reimplement filters
  // const handleFilterType = (values: string[]) => {
  //   console.log(values);
  //   if (values.length == 0) {
  //     setData(dataset);
  //     return;
  //   }
  //   setData(
  //     dataset.filter((item) => {
  //       if (!item.tag || values.length == 0) return false;
  //       for (let i = 0; i < values.length; i++) {
  //         if (values[i]?.label === item.tag) return true;
  //       }
  //       return false;
  //     })
  //   );
  // };