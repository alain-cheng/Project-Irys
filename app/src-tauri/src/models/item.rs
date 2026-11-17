use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    pub item_code: i32,
    pub item_name: String,
    pub remarks: Option<String>,
    pub item_group_id: Option<i32>,
    pub units_in_stock: i32,
    pub return_stocks: Option<i32>,
    pub unit_code: Option<i32>,
    pub base_price: f64,
    pub s_disc1: Option<i32>,
    pub s_disc2: Option<i32>,
    pub s_disc3: Option<i32>,
    pub s_disc4: Option<i32>,
    pub s_disc5: Option<i32>,
    pub s_disc6: Option<i32>,
    pub s_disc7: Option<i32>,
    pub s_disc8: Option<i32>,
    pub s_disc9: Option<i32>,
    pub s_disc10: Option<i32>,
    pub s_disc_id: String,
    pub selling_price: f64,
    pub r1_price: f64,
    pub r1_disc1: Option<i32>,
    pub r1_disc2: Option<i32>,
    pub r1_disc3: Option<i32>,
    pub r1_disc4: Option<i32>,
    pub r1_disc5: Option<i32>,
    pub r1_disc6: Option<i32>,
    pub r1_disc7: Option<i32>,
    pub r1_disc8: Option<i32>,
    pub r1_disc9: Option<i32>,
    pub r1_disc10: Option<i32>,
    pub r1_disc_id: String,
    pub r1_s_price: f64,
    pub r2_price: f64,
    pub r2_disc1: Option<i32>,
    pub r2_disc2: Option<i32>,
    pub r2_disc3: Option<i32>,
    pub r2_disc4: Option<i32>,
    pub r2_disc5: Option<i32>,
    pub r2_disc6: Option<i32>,
    pub r2_disc7: Option<i32>,
    pub r2_disc8: Option<i32>,
    pub r2_disc9: Option<i32>,
    pub r2_disc10: Option<i32>,
    pub r2_disc_id: String,
    pub sp_price: f64,
    pub sp_disc1: Option<i32>,
    pub sp_disc2: Option<i32>,
    pub sp_disc3: Option<i32>,
    pub sp_disc4: Option<i32>,
    pub sp_disc5: Option<i32>,
    pub sp_disc6: Option<i32>,
    pub sp_disc7: Option<i32>,
    pub sp_disc8: Option<i32>,
    pub sp_disc9: Option<i32>,
    pub sp_disc10: Option<i32>,
    pub sp_disc_id: String,
    pub p_unit_price: f64,
    pub p_disc1: Option<i32>,
    pub p_disc2: Option<i32>,
    pub p_disc3: Option<i32>,
    pub p_disc4: Option<i32>,
    pub p_disc5: Option<i32>,
    pub p_disc6: Option<i32>,
    pub p_disc7: Option<i32>,
    pub p_disc8: Option<i32>,
    pub p_disc9: Option<i32>,
    pub p_disc10: Option<i32>,
    pub p_disc_id: String,
    pub purchase_price: f64,
    pub retail_price: f64,
    pub category_id: Option<i32>,
    pub reorder_level: i32,
    pub is_discontinued: bool,
    pub on_s_order: f64,
    pub on_p_order: f64,
    pub supplier_id: Option<i32>,
    pub average_cost: f64,
    pub photo_file: Option<String>,
    pub is_edited: bool,
    pub is_reorder_active: bool,
    pub item_commission: f64,
    pub p_term_code: Option<i32>,
    pub pack: Option<String>,
    pub is_inventory_adjust: bool,
    pub item_location_id: Option<i32>,
    pub temp_average_cost: f64,
    pub is_kit: bool,
    pub term_code: Option<i32>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewItem {
    pub item_name: String,
    pub remarks: Option<String>,
    pub item_group_id: Option<i32>,
    #[serde(default)]
    pub units_in_stock: i32,
    #[serde(default = "default_optional_zero")]
    pub return_stocks: Option<i32>,
    pub unit_code: Option<i32>,
    #[serde(default)]
    pub base_price: f64,
    #[serde(default = "default_optional_zero")]
    pub s_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub s_disc_id: String,
    #[serde(default)]
    pub selling_price: f64,
    #[serde(default)]
    pub r1_price: f64,
    #[serde(default = "default_optional_zero")]
    pub r1_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r1_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub r1_disc_id: String,
    #[serde(default)]
    pub r1_s_price: f64,
    #[serde(default)]
    pub r2_price: f64,
    #[serde(default = "default_optional_zero")]
    pub r2_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub r2_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub r2_disc_id: String,
    #[serde(default)]
    pub sp_price: f64,
    #[serde(default = "default_optional_zero")]
    pub sp_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub sp_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub sp_disc_id: String,
    #[serde(default)]
    pub p_unit_price: f64,
    #[serde(default = "default_optional_zero")]
    pub p_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub p_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub p_disc_id: String,
    #[serde(default)]
    pub purchase_price: f64,
    #[serde(default)]
    pub retail_price: f64,
    pub category_id: Option<i32>,
    #[serde(default)]
    pub reorder_level: i32,
    #[serde(default)]
    pub is_discontinued: bool,
    #[serde(default)]
    pub on_s_order: f64,
    #[serde(default)]
    pub on_p_order: f64,
    pub supplier_id: Option<i32>,
    #[serde(default)]
    pub average_cost: f64,
    pub photo_file: Option<String>,
    #[serde(default)]
    pub is_edited: bool,
    #[serde(default)]
    pub is_reorder_active: bool,
    #[serde(default)]
    pub item_commission: f64,
    pub p_term_code: Option<i32>,
    pub pack: Option<String>,
    #[serde(default)]
    pub is_inventory_adjust: bool,
    pub item_location_id: Option<i32>,
    #[serde(default)]
    pub temp_average_cost: f64,
    #[serde(default)]
    pub is_kit: bool,
    pub term_code: Option<i32>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateItem {
    pub item_name: String,
    pub remarks: Option<String>,
    pub item_group_id: Option<i32>,
    pub units_in_stock: i32,
    pub return_stocks: Option<i32>,
    pub unit_code: Option<i32>,
    pub base_price: f64,
    pub s_disc1: Option<i32>,
    pub s_disc2: Option<i32>,
    pub s_disc3: Option<i32>,
    pub s_disc4: Option<i32>,
    pub s_disc5: Option<i32>,
    pub s_disc6: Option<i32>,
    pub s_disc7: Option<i32>,
    pub s_disc8: Option<i32>,
    pub s_disc9: Option<i32>,
    pub s_disc10: Option<i32>,
    pub s_disc_id: String,
    pub selling_price: f64,
    pub r1_price: f64,
    pub r1_disc1: Option<i32>,
    pub r1_disc2: Option<i32>,
    pub r1_disc3: Option<i32>,
    pub r1_disc4: Option<i32>,
    pub r1_disc5: Option<i32>,
    pub r1_disc6: Option<i32>,
    pub r1_disc7: Option<i32>,
    pub r1_disc8: Option<i32>,
    pub r1_disc9: Option<i32>,
    pub r1_disc10: Option<i32>,
    pub r1_disc_id: String,
    pub r1_s_price: f64,
    pub r2_price: f64,
    pub r2_disc1: Option<i32>,
    pub r2_disc2: Option<i32>,
    pub r2_disc3: Option<i32>,
    pub r2_disc4: Option<i32>,
    pub r2_disc5: Option<i32>,
    pub r2_disc6: Option<i32>,
    pub r2_disc7: Option<i32>,
    pub r2_disc8: Option<i32>,
    pub r2_disc9: Option<i32>,
    pub r2_disc10: Option<i32>,
    pub r2_disc_id: String,
    pub sp_price: f64,
    pub sp_disc1: Option<i32>,
    pub sp_disc2: Option<i32>,
    pub sp_disc3: Option<i32>,
    pub sp_disc4: Option<i32>,
    pub sp_disc5: Option<i32>,
    pub sp_disc6: Option<i32>,
    pub sp_disc7: Option<i32>,
    pub sp_disc8: Option<i32>,
    pub sp_disc9: Option<i32>,
    pub sp_disc10: Option<i32>,
    pub sp_disc_id: String,
    pub p_unit_price: f64,
    pub p_disc1: Option<i32>,
    pub p_disc2: Option<i32>,
    pub p_disc3: Option<i32>,
    pub p_disc4: Option<i32>,
    pub p_disc5: Option<i32>,
    pub p_disc6: Option<i32>,
    pub p_disc7: Option<i32>,
    pub p_disc8: Option<i32>,
    pub p_disc9: Option<i32>,
    pub p_disc10: Option<i32>,
    pub p_disc_id: String,
    pub purchase_price: f64,
    pub retail_price: f64,
    pub category_id: Option<i32>,
    pub reorder_level: i32,
    pub is_discontinued: bool,
    pub on_s_order: f64,
    pub on_p_order: f64,
    pub supplier_id: Option<i32>,
    pub average_cost: f64,
    pub photo_file: Option<String>,
    pub is_edited: bool,
    pub is_reorder_active: bool,
    pub item_commission: f64,
    pub p_term_code: Option<i32>,
    pub pack: Option<String>,
    pub is_inventory_adjust: bool,
    pub item_location_id: Option<i32>,
    pub temp_average_cost: f64,
    pub is_kit: bool,
    pub term_code: Option<i32>,
}

fn default_optional_zero() -> Option<i32> {
    Some(0)
}

fn default_discount_id() -> String {
    "Net".to_owned()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_item_uses_zero_and_net_defaults() {
        let item: NewItem = serde_json::from_value(serde_json::json!({
            "itemName": "Test Item",
            "unitCode": 16,
            "categoryId": 1,
            "supplierId": 1
        }))
        .unwrap();
        assert_eq!(item.item_name, "Test Item");
        assert_eq!(item.unit_code, Some(16));
        assert_eq!(item.category_id, Some(1));
        assert_eq!(item.supplier_id, Some(1));
        assert_eq!(item.units_in_stock, 0);
        assert_eq!(item.base_price, 0.0);
        assert!(!item.is_discontinued);
        assert_eq!(item.item_group_id, None);
        assert_eq!(item.return_stocks, Some(0));
        assert_eq!(item.s_disc1, Some(0));
        assert_eq!(item.s_disc2, Some(0));
        assert_eq!(item.s_disc3, Some(0));
        assert_eq!(item.s_disc4, Some(0));
        assert_eq!(item.s_disc5, Some(0));
        assert_eq!(item.s_disc6, Some(0));
        assert_eq!(item.s_disc7, Some(0));
        assert_eq!(item.s_disc8, Some(0));
        assert_eq!(item.s_disc9, Some(0));
        assert_eq!(item.s_disc10, Some(0));
        assert_eq!(item.r1_disc1, Some(0));
        assert_eq!(item.r1_disc2, Some(0));
        assert_eq!(item.r1_disc3, Some(0));
        assert_eq!(item.r1_disc4, Some(0));
        assert_eq!(item.r1_disc5, Some(0));
        assert_eq!(item.r1_disc6, Some(0));
        assert_eq!(item.r1_disc7, Some(0));
        assert_eq!(item.r1_disc8, Some(0));
        assert_eq!(item.r1_disc9, Some(0));
        assert_eq!(item.r1_disc10, Some(0));
        assert_eq!(item.r2_disc1, Some(0));
        assert_eq!(item.r2_disc2, Some(0));
        assert_eq!(item.r2_disc3, Some(0));
        assert_eq!(item.r2_disc4, Some(0));
        assert_eq!(item.r2_disc5, Some(0));
        assert_eq!(item.r2_disc6, Some(0));
        assert_eq!(item.r2_disc7, Some(0));
        assert_eq!(item.r2_disc8, Some(0));
        assert_eq!(item.r2_disc9, Some(0));
        assert_eq!(item.r2_disc10, Some(0));
        assert_eq!(item.sp_disc1, Some(0));
        assert_eq!(item.sp_disc2, Some(0));
        assert_eq!(item.sp_disc3, Some(0));
        assert_eq!(item.sp_disc4, Some(0));
        assert_eq!(item.sp_disc5, Some(0));
        assert_eq!(item.sp_disc6, Some(0));
        assert_eq!(item.sp_disc7, Some(0));
        assert_eq!(item.sp_disc8, Some(0));
        assert_eq!(item.sp_disc9, Some(0));
        assert_eq!(item.sp_disc10, Some(0));
        assert_eq!(item.p_disc1, Some(0));
        assert_eq!(item.p_disc2, Some(0));
        assert_eq!(item.p_disc3, Some(0));
        assert_eq!(item.p_disc4, Some(0));
        assert_eq!(item.p_disc5, Some(0));
        assert_eq!(item.p_disc6, Some(0));
        assert_eq!(item.p_disc7, Some(0));
        assert_eq!(item.p_disc8, Some(0));
        assert_eq!(item.p_disc9, Some(0));
        assert_eq!(item.p_disc10, Some(0));
        assert_eq!(item.s_disc_id, "Net");
        assert_eq!(item.r1_disc_id, "Net");
        assert_eq!(item.r2_disc_id, "Net");
        assert_eq!(item.sp_disc_id, "Net");
        assert_eq!(item.p_disc_id, "Net");
    }

    #[test]
    fn nullable_discounts_preserve_explicit_null() {
        let item: NewItem = serde_json::from_value(serde_json::json!({
            "itemName": "Test Item", "sDisc1": null, "returnStocks": null
        }))
        .unwrap();
        assert_eq!(item.s_disc1, None);
        assert_eq!(item.return_stocks, None);
    }

    #[test]
    fn update_requires_full_non_nullable_payload() {
        assert!(serde_json::from_value::<UpdateItem>(serde_json::json!({
            "itemName": "Partial update"
        }))
        .is_err());
    }

    #[test]
    fn item_contract_uses_camel_case_and_accepts_full_updates() {
        let mut payload = serde_json::json!({});
        payload["itemCode"] = serde_json::json!(1);
        payload["itemName"] = serde_json::json!("Test");
        payload["remarks"] = serde_json::json!(null);
        payload["itemGroupId"] = serde_json::json!(null);
        payload["unitsInStock"] = serde_json::json!(1);
        payload["returnStocks"] = serde_json::json!(null);
        payload["unitCode"] = serde_json::json!(null);
        payload["basePrice"] = serde_json::json!(0.0);
        payload["sDisc1"] = serde_json::json!(null);
        payload["sDisc2"] = serde_json::json!(null);
        payload["sDisc3"] = serde_json::json!(null);
        payload["sDisc4"] = serde_json::json!(null);
        payload["sDisc5"] = serde_json::json!(null);
        payload["sDisc6"] = serde_json::json!(null);
        payload["sDisc7"] = serde_json::json!(null);
        payload["sDisc8"] = serde_json::json!(null);
        payload["sDisc9"] = serde_json::json!(null);
        payload["sDisc10"] = serde_json::json!(null);
        payload["sDiscId"] = serde_json::json!("Test");
        payload["sellingPrice"] = serde_json::json!(0.0);
        payload["r1Price"] = serde_json::json!(0.0);
        payload["r1Disc1"] = serde_json::json!(null);
        payload["r1Disc2"] = serde_json::json!(null);
        payload["r1Disc3"] = serde_json::json!(null);
        payload["r1Disc4"] = serde_json::json!(null);
        payload["r1Disc5"] = serde_json::json!(null);
        payload["r1Disc6"] = serde_json::json!(null);
        payload["r1Disc7"] = serde_json::json!(null);
        payload["r1Disc8"] = serde_json::json!(null);
        payload["r1Disc9"] = serde_json::json!(null);
        payload["r1Disc10"] = serde_json::json!(null);
        payload["r1DiscId"] = serde_json::json!("Test");
        payload["r1SPrice"] = serde_json::json!(0.0);
        payload["r2Price"] = serde_json::json!(0.0);
        payload["r2Disc1"] = serde_json::json!(null);
        payload["r2Disc2"] = serde_json::json!(null);
        payload["r2Disc3"] = serde_json::json!(null);
        payload["r2Disc4"] = serde_json::json!(null);
        payload["r2Disc5"] = serde_json::json!(null);
        payload["r2Disc6"] = serde_json::json!(null);
        payload["r2Disc7"] = serde_json::json!(null);
        payload["r2Disc8"] = serde_json::json!(null);
        payload["r2Disc9"] = serde_json::json!(null);
        payload["r2Disc10"] = serde_json::json!(null);
        payload["r2DiscId"] = serde_json::json!("Test");
        payload["spPrice"] = serde_json::json!(0.0);
        payload["spDisc1"] = serde_json::json!(null);
        payload["spDisc2"] = serde_json::json!(null);
        payload["spDisc3"] = serde_json::json!(null);
        payload["spDisc4"] = serde_json::json!(null);
        payload["spDisc5"] = serde_json::json!(null);
        payload["spDisc6"] = serde_json::json!(null);
        payload["spDisc7"] = serde_json::json!(null);
        payload["spDisc8"] = serde_json::json!(null);
        payload["spDisc9"] = serde_json::json!(null);
        payload["spDisc10"] = serde_json::json!(null);
        payload["spDiscId"] = serde_json::json!("Test");
        payload["pUnitPrice"] = serde_json::json!(0.0);
        payload["pDisc1"] = serde_json::json!(null);
        payload["pDisc2"] = serde_json::json!(null);
        payload["pDisc3"] = serde_json::json!(null);
        payload["pDisc4"] = serde_json::json!(null);
        payload["pDisc5"] = serde_json::json!(null);
        payload["pDisc6"] = serde_json::json!(null);
        payload["pDisc7"] = serde_json::json!(null);
        payload["pDisc8"] = serde_json::json!(null);
        payload["pDisc9"] = serde_json::json!(null);
        payload["pDisc10"] = serde_json::json!(null);
        payload["pDiscId"] = serde_json::json!("Test");
        payload["purchasePrice"] = serde_json::json!(0.0);
        payload["retailPrice"] = serde_json::json!(0.0);
        payload["categoryId"] = serde_json::json!(null);
        payload["reorderLevel"] = serde_json::json!(1);
        payload["isDiscontinued"] = serde_json::json!(false);
        payload["onSOrder"] = serde_json::json!(0.0);
        payload["onPOrder"] = serde_json::json!(0.0);
        payload["supplierId"] = serde_json::json!(null);
        payload["averageCost"] = serde_json::json!(0.0);
        payload["photoFile"] = serde_json::json!(null);
        payload["isEdited"] = serde_json::json!(false);
        payload["isReorderActive"] = serde_json::json!(false);
        payload["itemCommission"] = serde_json::json!(0.0);
        payload["pTermCode"] = serde_json::json!(null);
        payload["pack"] = serde_json::json!(null);
        payload["isInventoryAdjust"] = serde_json::json!(false);
        payload["itemLocationId"] = serde_json::json!(null);
        payload["tempAverageCost"] = serde_json::json!(0.0);
        payload["isKit"] = serde_json::json!(false);
        payload["termCode"] = serde_json::json!(null);
        let update: UpdateItem = serde_json::from_value(payload.clone()).unwrap();
        assert_eq!(update.r1_s_price, 0.0);
        assert_eq!(update.p_term_code, None);
        assert_eq!(update.is_inventory_adjust, false);
        let item = Item {
            item_code: 1,
            item_name: update.item_name,
            remarks: update.remarks,
            item_group_id: update.item_group_id,
            units_in_stock: update.units_in_stock,
            return_stocks: update.return_stocks,
            unit_code: update.unit_code,
            base_price: update.base_price,
            s_disc1: update.s_disc1,
            s_disc2: update.s_disc2,
            s_disc3: update.s_disc3,
            s_disc4: update.s_disc4,
            s_disc5: update.s_disc5,
            s_disc6: update.s_disc6,
            s_disc7: update.s_disc7,
            s_disc8: update.s_disc8,
            s_disc9: update.s_disc9,
            s_disc10: update.s_disc10,
            s_disc_id: update.s_disc_id,
            selling_price: update.selling_price,
            r1_price: update.r1_price,
            r1_disc1: update.r1_disc1,
            r1_disc2: update.r1_disc2,
            r1_disc3: update.r1_disc3,
            r1_disc4: update.r1_disc4,
            r1_disc5: update.r1_disc5,
            r1_disc6: update.r1_disc6,
            r1_disc7: update.r1_disc7,
            r1_disc8: update.r1_disc8,
            r1_disc9: update.r1_disc9,
            r1_disc10: update.r1_disc10,
            r1_disc_id: update.r1_disc_id,
            r1_s_price: update.r1_s_price,
            r2_price: update.r2_price,
            r2_disc1: update.r2_disc1,
            r2_disc2: update.r2_disc2,
            r2_disc3: update.r2_disc3,
            r2_disc4: update.r2_disc4,
            r2_disc5: update.r2_disc5,
            r2_disc6: update.r2_disc6,
            r2_disc7: update.r2_disc7,
            r2_disc8: update.r2_disc8,
            r2_disc9: update.r2_disc9,
            r2_disc10: update.r2_disc10,
            r2_disc_id: update.r2_disc_id,
            sp_price: update.sp_price,
            sp_disc1: update.sp_disc1,
            sp_disc2: update.sp_disc2,
            sp_disc3: update.sp_disc3,
            sp_disc4: update.sp_disc4,
            sp_disc5: update.sp_disc5,
            sp_disc6: update.sp_disc6,
            sp_disc7: update.sp_disc7,
            sp_disc8: update.sp_disc8,
            sp_disc9: update.sp_disc9,
            sp_disc10: update.sp_disc10,
            sp_disc_id: update.sp_disc_id,
            p_unit_price: update.p_unit_price,
            p_disc1: update.p_disc1,
            p_disc2: update.p_disc2,
            p_disc3: update.p_disc3,
            p_disc4: update.p_disc4,
            p_disc5: update.p_disc5,
            p_disc6: update.p_disc6,
            p_disc7: update.p_disc7,
            p_disc8: update.p_disc8,
            p_disc9: update.p_disc9,
            p_disc10: update.p_disc10,
            p_disc_id: update.p_disc_id,
            purchase_price: update.purchase_price,
            retail_price: update.retail_price,
            category_id: update.category_id,
            reorder_level: update.reorder_level,
            is_discontinued: update.is_discontinued,
            on_s_order: update.on_s_order,
            on_p_order: update.on_p_order,
            supplier_id: update.supplier_id,
            average_cost: update.average_cost,
            photo_file: update.photo_file,
            is_edited: update.is_edited,
            is_reorder_active: update.is_reorder_active,
            item_commission: update.item_commission,
            p_term_code: update.p_term_code,
            pack: update.pack,
            is_inventory_adjust: update.is_inventory_adjust,
            item_location_id: update.item_location_id,
            temp_average_cost: update.temp_average_cost,
            is_kit: update.is_kit,
            term_code: update.term_code,
        };
        assert_eq!(serde_json::to_value(item).unwrap(), payload);
    }
}
