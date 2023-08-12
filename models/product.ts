export interface Product {
    _id: string
    product_name: string
    product_image: string
    product_description: string
    product_barcode: string
    brand_name: string
}

export interface Gs1Product {
    _id: string
    imgUrl: string
    product_info: {
        Main_Fields: {
            GTIN: string
            Trade_Item_Description: string
            Short_Description: string
            Net_Content: {
                text: string
                UOM: string
                value: string
            },
            Supplier_Catalog_Number: string
            GLN: string
            BrandName: string
            Sub_Brand_Name: string
            functionalName: string
            Variant: string
            Country_of_Origin: [
                {
                    value: string
                    code: string
                }
            ],
            Effective_Date_Time: string
            GPC_Category_Code: string
            Trade_Item_Unit_Descriptor: [
                {
                    value: string
                    code: string
                }
            ],
            internal_product_description: string
            user_company: string
        },
        General_Information: {
            Target_Market: [
                {
                    value: string
                    code: string
                }
            ],
            Manufacturer_Name: string
            Additional_Trade_Item_Description_1: string
            Product_Description_English: string
            Manufacturer_Address: string
            Search_Words: string
            Manufacturer_Product_Code: string
            Discontinued_Date_Time: string
            drained_weight: string
        },
        Marketing_Information: {
            Trade_Item_Marketing_Message: string
            Trade_Item_Marketing_Message_2: string
            Trade_Item_Marketing_Message_3: string
            Trade_Item_Marketing_Message_4: string
            Trade_Item_Marketing_Message_5: string
            Trade_Item_Marketing_Message_6: string
            Trade_Item_Marketing_Message_7: string
        },
        Logistics_and_Commercial_Properties_General: {
            Is_Trade_Item_A_Base_Unit: [
                {
                    value: string
                    code: string
                }
            ],
            Is_Trade_Item_A_Consumer_Unit: [
                {
                    value: string
                    code: string
                }
            ],
            Is_Trade_Item_An_Orderable_Unit: [
                {
                    value: string
                    code: string
                }
            ],
            Is_Trade_Item_A_Variable_Unit: [
                {
                    value: string
                    code: string
                }
            ],
            Is_Trade_Item_An_Invoice_Unit: [
                {
                    value: string
                    code: string
                }
            ]
        },
        Logistics_and_Commercial_Properties_Additional: {
            First_Order_Date: string
            Last_Order_Date: string
            Product_Shelf_Life: {
                text: string
                UOM: string
                value: string
            },
            Order_Quantity_Minimum_Size: {
                text: string
                UOM: string
                value: string
            },
            Order_Quantity_Maximum_Size: {
                text: string
                UOM: string
                value: string
            },
            Is_Non_Sold_Trade_Item_Returnable: [
                {
                    value: string
                    code: string
                }
            ],
            Ordering_Lead_Time: {
                text: string
                UOM: string
                value: string
            },
            Is_Packaging_Marked_Returnable: [
                {
                    value: string
                    code: string
                }
            ],
            Delivery_Method: [
                {
                    value: string
                    code: string
                }
            ],
            Transportation_Temperature_Minimum: string
            Transportation_Temperature_Maximum: string
            Storage_Temperature_Minimum: string
            Storage_Temperature_Maximum: string
            Distribution_Temperature_Minimum: string
            Distribution_Temperature_Maximum: string
        },
        Product_Dimensions: {
            Product_Height: {
                text: string
                UOM: string
                value: string
            },
            Product_Depth: {
                text: string
                UOM: string
                value: string
            },
            Product_Width: {
                text: string
                UOM: string
                value: string
            },
            Net_Weight: {
                text: string
                UOM: string
                value: string
            },
            Product_Gross_Weight: {
                text: string
                UOM: string
                value: string
            },
            Price_Comparison_Content: {
                text: string
                UOM: string
                value: string
            }
        },
        Tray_Dimensions: {
            Tray_Type_Code: [
                {
                    value: string
                    code: string
                }
            ],
            Amount_of_Products_in_Tray: string
            Tray_Height: {
                text: string
                UOM: string
                value: string
            },
            Tray_Depth: {
                text: string
                UOM: string
                value: string
            },
            Tray_Width: {
                text: string
                UOM: string
                value: string
            },
            Tray_Volume: {
                text: string
                UOM: string
                value: string
            },
            Tray_Gross_Weight: {
                text: string
                UOM: string
                value: string
            }
        },
        Case_or_Carton_Dimensions: {
            Packaging_Type_Code: [
                {
                    value: string
                    code: string
                }
            ],
            Amount_of_Products_in_Package_or_Carton: 11,
            Package_Height: {
                text: string
                UOM: string
                value: string
            },
            Package_Depth: {
                text: string
                UOM: string
                value: string
            },
            Package_Width: {
                text: string
                UOM: string
                value: string
            },
            Package_Gross_Weight: {
                text: string
                UOM: string
                value: string
            },
            Package_Volume: {
                text: string
                UOM: string
                value: string
            },
            GTIN_Package: string
        },
        Pallet_or_Logistic_Unit_Dimensions: {
            Logistics_Unit_Height: {
                text: string
                UOM: string
                value: string
            },
            Logistics_Unit_Depth: {
                text: string
                UOM: string
                value: string
            },
            Logistics_Unit_Width: {
                text: string
                UOM: string
                value: string
            },
            Logistics_Unit_Gross_Weight: {
                text: string
                UOM: string
                value: string
            },
            Pallet_Volume: {
                text: string
                UOM: string
                value: string
            },
            Quantity_Of_TradeItems_Per_Pallet_Layer: string
            Quantity_Of_Layers_Per_Pallet: string
            Quantity_Of_Trade_Items_Per_Pallet: string
        },
        Promotional_Product_Information: {
            Promotion_Type_Code: [
                {
                    value: string
                    code: string
                }
            ],
            Free_Quantity_Of_Product: string
            promotion_of: string
        },
        Kashrut: {
            Kosher_for_Passover: [
                {
                    value: string
                    code: string
                }
            ],
            Kosher_Supervision_Type: [
                {
                    value: string
                    code: string
                }
            ],
            Rabbinate: [
                {
                    value: string
                    code: string
                }
            ],
            Board_of_Supervision: [
                {
                    value: string
                    code: string
                }
            ],
            Cooking_Israel: [
                {
                    value: string
                    code: string
                }
            ],
            Israel_Milk: [
                {
                    value: string
                    code: string
                }
            ],
            Sabbath_Observing_Plant: [
                {
                    value: string
                    code: string
                }
            ],
            Sheviit_Orlah_Tevel: string
            Kosher_for_Passover_Remark: string
        },
        Product_Components_and_Instructions_General: {
            Diet_Information: [
                {
                    value: string
                    code: string
                }
            ],
            Ingredient_Sequence_and_Name: string
            Allergen_Type_Code_and_Containment: [
                {
                    value: string
                    code: string
                }
            ],
            Allergen_Type_Code_and_Containment_May_Contain: [
                {
                    value: string
                    code: string
                }
            ],
            Healthy_Product: string
            Ingredient_Display: [
                {
                    value: string
                    code: string
                }
            ],
            Allergen_Displayed: [
                {
                    value: string
                    code: string
                }
            ]
        },
        Additional_Information: {
            Serving_Suggestion: string
            Consumer_Storage_Instructions: string
            Fat_Percentage_in_Product: string
            Cream_Percentage_in_Product: string
            Fruit_Percentage_in_Product: string
            Alcohol_Percentage_in_Product: string
            Forbidden_Under_the_Age_of_18: [
                {
                    value: string
                    code: string
                }
            ],
            Hazard_Precautionary_Statement: string
            Serving_Size_Description: {
                text: string
                UOM: string
                value: string
            },
            pH: string
            Color_Number: string
            Color: string
            Color_Code: string
            Skin_Type: string
            Hair_Type: string
            Contains_Sulfur_Dioxide: [
                {
                    value: string
                    code: string
                }
            ],
            Food_Symbol_Red: [
                {
                    value: string
                    code: string
                },
                {
                    value: string
                    code: string
                }
            ]
        },
        System_Features: {
            Publication_Date_Time: string
            modification_timestamp: string
            Creation_Date_Time: string
        },
        Additional_Features: {
            Private_Brand: [
                {
                    value: string
                    code: string
                }
            ],
            Parallel_Import: [
                {
                    value: string
                    code: string
                }
            ],
            Item_Franchisee: [
                {
                    value: string
                    code: string
                }
            ],
            Regulated_Price: [
                {
                    value: string
                    code: string
                }
            ],
            Alternate_Item: string
            New_Item_Classification: [
                {
                    value: string
                    code: string
                }
            ],
            Item_with_a_Deposit: [
                {
                    value: string
                    code: string
                }
            ],
            Internal_Classification: string
            Remarks: string
            Product_Categories_Classification: string
            internal_product_description_additional: string
            Substituted_Item: string
            Remark_to_Customer: string
            Imported_Item: string
            Produced_in_Israel: string
            animal_tested: string
            expose_for_app_from: string
        },
        Internal_System_Fields: {
            group_id: string
            id: string
            DisplayName: string
            Name: string
            ProductName: string
            unavailability_type: [
                {
                    value: string
                    code: string
                }
            ],
            product_code: string
            Product_Status: [
                {
                    value: string
                    code: string
                }
            ]
        },
        Nutritional_Values: {
            table: {
                tableName: string
                numberOfRows: number
                numberOfCols: number
                colLabels: [
                    {
                        label: string
                        code: string
                        field_id: string
                    }
                ],
                rows: [
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    },
                    {
                        label: string
                        code: string
                        fields: [
                            {
                                col_label: string
                                col_code: string
                                col_field_id: string,
                                field_id: string
                                field_name: string
                                name: string
                                text: string
                                UOM: string
                                value: string
                            }
                        ]
                    }
                ]
            }
        }
    },
    private_data: any[]
    media_assets: [
        {
            id: string
            retailer_gln: string
            GTIN: string
            GLN: string
            filename: string
            filename_display: string
            file_extension: string
            width: string,
            height: string,
            show_in_gallery: string
            drawing_key: string
            hidden: string
            language_code: string
            translation_of_file_id: string
            file_size: string
            source: string
            modification_timestamp: string
            system_id: string
            image_type: string
            facing: string
            plunge_angle: string
            arc_position_number: string
            default_image: string
            product_pic_designation: string
            publication_timestamp: string
            publish_file: string
            creation_timestamp: string
        },
        {
            id: string
            retailer_gln: string
            GTIN: string
            GLN: string
            filename: string
            filename_display: string
            file_extension: string
            width: string
            height: string
            show_in_gallery: string
            drawing_key: string
            hidden: string
            language_code: string
            translation_of_file_id: string
            file_size: string
            source: string
            modification_timestamp: string
            system_id: string
            image_type: string
            facing: string
            plunge_angle: string
            arc_position_number: string
            default_image: string
            product_pic_designation: string
            publication_timestamp: string
            publish_file: string
            creation_timestamp: string
        },
        {
            id: string
            retailer_gln: string
            GTIN: string
            GLN: string
            filename: string
            filename_display: string
            file_extension: string
            width: string
            height: string
            show_in_gallery: string
            drawing_key: string
            hidden: string
            language_code: string
            translation_of_file_id: string
            file_size: string
            source: string
            modification_timestamp: string
            system_id: string
            image_type: string
            facing: string
            plunge_angle: string
            arc_position_number: string
            default_image: string
            product_pic_designation: string
            publication_timestamp: string
            publish_file: string
            creation_timestamp: string
        }
    ],
    multi_pack: any[]
}