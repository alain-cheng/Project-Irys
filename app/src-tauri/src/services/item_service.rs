use anyhow::Context;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::item::{Item, NewItem, UpdateItem};

fn item_from_row(row: Row) -> anyhow::Result<Item> {
    Ok(Item {
        item_code: row
            .try_get::<i32, _>("ItemCode")?
            .context("Unexpected NULL value for Item ItemCode")?,
        item_name: row
            .try_get::<&str, _>("ItemName")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item ItemName")?,
        remarks: row.try_get::<&str, _>("Remarks")?.map(str::to_owned),
        item_group_id: row.try_get::<i32, _>("ItemGroupId")?,
        units_in_stock: row
            .try_get::<i32, _>("UnitsInStock")?
            .context("Unexpected NULL value for Item UnitsInStock")?,
        return_stocks: row.try_get::<i32, _>("ReturnStocks")?,
        unit_code: row.try_get::<i32, _>("UnitCode")?,
        base_price: row
            .try_get::<f64, _>("BasePrice")?
            .context("Unexpected NULL value for Item BasePrice")?,
        s_disc1: row.try_get::<i32, _>("SDisc1")?,
        s_disc2: row.try_get::<i32, _>("SDisc2")?,
        s_disc3: row.try_get::<i32, _>("SDisc3")?,
        s_disc4: row.try_get::<i32, _>("SDisc4")?,
        s_disc5: row.try_get::<i32, _>("SDisc5")?,
        s_disc6: row.try_get::<i32, _>("SDisc6")?,
        s_disc7: row.try_get::<i32, _>("SDisc7")?,
        s_disc8: row.try_get::<i32, _>("SDisc8")?,
        s_disc9: row.try_get::<i32, _>("SDisc9")?,
        s_disc10: row.try_get::<i32, _>("SDisc10")?,
        s_disc_id: row
            .try_get::<&str, _>("SDiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item SDiscId")?,
        selling_price: row
            .try_get::<f64, _>("SellingPrice")?
            .context("Unexpected NULL value for Item SellingPrice")?,
        r1_price: row
            .try_get::<f64, _>("R1Price")?
            .context("Unexpected NULL value for Item R1Price")?,
        r1_disc1: row.try_get::<i32, _>("R1Disc1")?,
        r1_disc2: row.try_get::<i32, _>("R1Disc2")?,
        r1_disc3: row.try_get::<i32, _>("R1Disc3")?,
        r1_disc4: row.try_get::<i32, _>("R1Disc4")?,
        r1_disc5: row.try_get::<i32, _>("R1Disc5")?,
        r1_disc6: row.try_get::<i32, _>("R1Disc6")?,
        r1_disc7: row.try_get::<i32, _>("R1Disc7")?,
        r1_disc8: row.try_get::<i32, _>("R1Disc8")?,
        r1_disc9: row.try_get::<i32, _>("R1Disc9")?,
        r1_disc10: row.try_get::<i32, _>("R1Disc10")?,
        r1_disc_id: row
            .try_get::<&str, _>("R1DiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item R1DiscId")?,
        r1_s_price: row
            .try_get::<f64, _>("R1SPrice")?
            .context("Unexpected NULL value for Item R1SPrice")?,
        r2_price: row
            .try_get::<f64, _>("R2Price")?
            .context("Unexpected NULL value for Item R2Price")?,
        r2_disc1: row.try_get::<i32, _>("R2Disc1")?,
        r2_disc2: row.try_get::<i32, _>("R2Disc2")?,
        r2_disc3: row.try_get::<i32, _>("R2Disc3")?,
        r2_disc4: row.try_get::<i32, _>("R2Disc4")?,
        r2_disc5: row.try_get::<i32, _>("R2Disc5")?,
        r2_disc6: row.try_get::<i32, _>("R2Disc6")?,
        r2_disc7: row.try_get::<i32, _>("R2Disc7")?,
        r2_disc8: row.try_get::<i32, _>("R2Disc8")?,
        r2_disc9: row.try_get::<i32, _>("R2Disc9")?,
        r2_disc10: row.try_get::<i32, _>("R2Disc10")?,
        r2_disc_id: row
            .try_get::<&str, _>("R2DiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item R2DiscId")?,
        sp_price: row
            .try_get::<f64, _>("SPPrice")?
            .context("Unexpected NULL value for Item SPPrice")?,
        sp_disc1: row.try_get::<i32, _>("SPDisc1")?,
        sp_disc2: row.try_get::<i32, _>("SPDisc2")?,
        sp_disc3: row.try_get::<i32, _>("SPDisc3")?,
        sp_disc4: row.try_get::<i32, _>("SPDisc4")?,
        sp_disc5: row.try_get::<i32, _>("SPDisc5")?,
        sp_disc6: row.try_get::<i32, _>("SPDisc6")?,
        sp_disc7: row.try_get::<i32, _>("SPDisc7")?,
        sp_disc8: row.try_get::<i32, _>("SPDisc8")?,
        sp_disc9: row.try_get::<i32, _>("SPDisc9")?,
        sp_disc10: row.try_get::<i32, _>("SPDisc10")?,
        sp_disc_id: row
            .try_get::<&str, _>("SPDiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item SPDiscId")?,
        p_unit_price: row
            .try_get::<f64, _>("PUnitPrice")?
            .context("Unexpected NULL value for Item PUnitPrice")?,
        p_disc1: row.try_get::<i32, _>("PDisc1")?,
        p_disc2: row.try_get::<i32, _>("PDisc2")?,
        p_disc3: row.try_get::<i32, _>("PDisc3")?,
        p_disc4: row.try_get::<i32, _>("PDisc4")?,
        p_disc5: row.try_get::<i32, _>("PDisc5")?,
        p_disc6: row.try_get::<i32, _>("PDisc6")?,
        p_disc7: row.try_get::<i32, _>("PDisc7")?,
        p_disc8: row.try_get::<i32, _>("PDisc8")?,
        p_disc9: row.try_get::<i32, _>("PDisc9")?,
        p_disc10: row.try_get::<i32, _>("PDisc10")?,
        p_disc_id: row
            .try_get::<&str, _>("PDiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Item PDiscId")?,
        purchase_price: row
            .try_get::<f64, _>("PurchasePrice")?
            .context("Unexpected NULL value for Item PurchasePrice")?,
        retail_price: row
            .try_get::<f64, _>("RetailPrice")?
            .context("Unexpected NULL value for Item RetailPrice")?,
        category_id: row.try_get::<i32, _>("CategoryId")?,
        reorder_level: row
            .try_get::<i32, _>("ReorderLevel")?
            .context("Unexpected NULL value for Item ReorderLevel")?,
        is_discontinued: row
            .try_get::<bool, _>("isDiscontinued")?
            .context("Unexpected NULL value for Item isDiscontinued")?,
        on_s_order: row
            .try_get::<f64, _>("OnSOrder")?
            .context("Unexpected NULL value for Item OnSOrder")?,
        on_p_order: row
            .try_get::<f64, _>("OnPOrder")?
            .context("Unexpected NULL value for Item OnPOrder")?,
        supplier_id: row.try_get::<i32, _>("SupplierId")?,
        average_cost: row
            .try_get::<f64, _>("AverageCost")?
            .context("Unexpected NULL value for Item AverageCost")?,
        photo_file: row.try_get::<&str, _>("PhotoFile")?.map(str::to_owned),
        is_edited: row
            .try_get::<bool, _>("isEdited")?
            .context("Unexpected NULL value for Item isEdited")?,
        is_reorder_active: row
            .try_get::<bool, _>("isReorderActive")?
            .context("Unexpected NULL value for Item isReorderActive")?,
        item_commission: row
            .try_get::<f64, _>("ItemCommission")?
            .context("Unexpected NULL value for Item ItemCommission")?,
        p_term_code: row.try_get::<i32, _>("PTermCode")?,
        pack: row.try_get::<&str, _>("Pack")?.map(str::to_owned),
        is_inventory_adjust: row
            .try_get::<bool, _>("isInventoryAdjust")?
            .context("Unexpected NULL value for Item isInventoryAdjust")?,
        item_location_id: row.try_get::<i32, _>("ItemLocationId")?,
        temp_average_cost: row
            .try_get::<f64, _>("TempAverageCost")?
            .context("Unexpected NULL value for Item TempAverageCost")?,
        is_kit: row
            .try_get::<bool, _>("isKit")?
            .context("Unexpected NULL value for Item isKit")?,
        term_code: row.try_get::<i32, _>("TermCode")?,
    })
}

/// Inserts a new item to the database
/// 
/// Arguments:
/// * `item` - item model containing the data for the new item

pub async fn add_item(pool: &Pool, item: NewItem) -> anyhow::Result<Item> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let row = client.query(
        r#"
        INSERT INTO dbo.Items (
            ItemName, Remarks, ItemGroupId, UnitsInStock, ReturnStocks,
            UnitCode, BasePrice, SDisc1, SDisc2, SDisc3,
            SDisc4, SDisc5, SDisc6, SDisc7, SDisc8,
            SDisc9, SDisc10, SDiscId, SellingPrice, R1Price,
            R1Disc1, R1Disc2, R1Disc3, R1Disc4, R1Disc5,
            R1Disc6, R1Disc7, R1Disc8, R1Disc9, R1Disc10,
            R1DiscId, R1SPrice, R2Price, R2Disc1, R2Disc2,
            R2Disc3, R2Disc4, R2Disc5, R2Disc6, R2Disc7,
            R2Disc8, R2Disc9, R2Disc10, R2DiscId, SPPrice,
            SPDisc1, SPDisc2, SPDisc3, SPDisc4, SPDisc5,
            SPDisc6, SPDisc7, SPDisc8, SPDisc9, SPDisc10,
            SPDiscId, PUnitPrice, PDisc1, PDisc2, PDisc3,
            PDisc4, PDisc5, PDisc6, PDisc7, PDisc8,
            PDisc9, PDisc10, PDiscId, PurchasePrice, RetailPrice,
            CategoryId, ReorderLevel, isDiscontinued, OnSOrder, OnPOrder,
            SupplierId, AverageCost, PhotoFile, isEdited, isReorderActive,
            ItemCommission, PTermCode, Pack, isInventoryAdjust, ItemLocationId,
            TempAverageCost, isKit, TermCode
        )
        OUTPUT
            INSERTED.ItemCode, INSERTED.ItemName, INSERTED.Remarks, INSERTED.ItemGroupId, INSERTED.UnitsInStock,
            INSERTED.ReturnStocks, INSERTED.UnitCode, INSERTED.BasePrice, INSERTED.SDisc1, INSERTED.SDisc2,
            INSERTED.SDisc3, INSERTED.SDisc4, INSERTED.SDisc5, INSERTED.SDisc6, INSERTED.SDisc7,
            INSERTED.SDisc8, INSERTED.SDisc9, INSERTED.SDisc10, INSERTED.SDiscId, INSERTED.SellingPrice,
            INSERTED.R1Price, INSERTED.R1Disc1, INSERTED.R1Disc2, INSERTED.R1Disc3, INSERTED.R1Disc4,
            INSERTED.R1Disc5, INSERTED.R1Disc6, INSERTED.R1Disc7, INSERTED.R1Disc8, INSERTED.R1Disc9,
            INSERTED.R1Disc10, INSERTED.R1DiscId, INSERTED.R1SPrice, INSERTED.R2Price, INSERTED.R2Disc1,
            INSERTED.R2Disc2, INSERTED.R2Disc3, INSERTED.R2Disc4, INSERTED.R2Disc5, INSERTED.R2Disc6,
            INSERTED.R2Disc7, INSERTED.R2Disc8, INSERTED.R2Disc9, INSERTED.R2Disc10, INSERTED.R2DiscId,
            INSERTED.SPPrice, INSERTED.SPDisc1, INSERTED.SPDisc2, INSERTED.SPDisc3, INSERTED.SPDisc4,
            INSERTED.SPDisc5, INSERTED.SPDisc6, INSERTED.SPDisc7, INSERTED.SPDisc8, INSERTED.SPDisc9,
            INSERTED.SPDisc10, INSERTED.SPDiscId, INSERTED.PUnitPrice, INSERTED.PDisc1, INSERTED.PDisc2,
            INSERTED.PDisc3, INSERTED.PDisc4, INSERTED.PDisc5, INSERTED.PDisc6, INSERTED.PDisc7,
            INSERTED.PDisc8, INSERTED.PDisc9, INSERTED.PDisc10, INSERTED.PDiscId, INSERTED.PurchasePrice,
            INSERTED.RetailPrice, INSERTED.CategoryId, INSERTED.ReorderLevel, INSERTED.isDiscontinued, INSERTED.OnSOrder,
            INSERTED.OnPOrder, INSERTED.SupplierId, INSERTED.AverageCost, INSERTED.PhotoFile, INSERTED.isEdited,
            INSERTED.isReorderActive, INSERTED.ItemCommission, INSERTED.PTermCode, INSERTED.Pack, INSERTED.isInventoryAdjust,
            INSERTED.ItemLocationId, INSERTED.TempAverageCost, INSERTED.isKit, INSERTED.TermCode
        VALUES (
            @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10,
            @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20,
            @P21, @P22, @P23, @P24, @P25, @P26, @P27, @P28, @P29, @P30,
            @P31, @P32, @P33, @P34, @P35, @P36, @P37, @P38, @P39, @P40,
            @P41, @P42, @P43, @P44, @P45, @P46, @P47, @P48, @P49, @P50,
            @P51, @P52, @P53, @P54, @P55, @P56, @P57, @P58, @P59, @P60,
            @P61, @P62, @P63, @P64, @P65, @P66, @P67, @P68, @P69, @P70,
            @P71, @P72, @P73, @P74, @P75, @P76, @P77, @P78, @P79, @P80,
            @P81, @P82, @P83, @P84, @P85, @P86, @P87, @P88
        );
        "#,
        &[
            &item.item_name,
            &item.remarks,
            &item.item_group_id,
            &item.units_in_stock,
            &item.return_stocks,
            &item.unit_code,
            &item.base_price,
            &item.s_disc1,
            &item.s_disc2,
            &item.s_disc3,
            &item.s_disc4,
            &item.s_disc5,
            &item.s_disc6,
            &item.s_disc7,
            &item.s_disc8,
            &item.s_disc9,
            &item.s_disc10,
            &item.s_disc_id,
            &item.selling_price,
            &item.r1_price,
            &item.r1_disc1,
            &item.r1_disc2,
            &item.r1_disc3,
            &item.r1_disc4,
            &item.r1_disc5,
            &item.r1_disc6,
            &item.r1_disc7,
            &item.r1_disc8,
            &item.r1_disc9,
            &item.r1_disc10,
            &item.r1_disc_id,
            &item.r1_s_price,
            &item.r2_price,
            &item.r2_disc1,
            &item.r2_disc2,
            &item.r2_disc3,
            &item.r2_disc4,
            &item.r2_disc5,
            &item.r2_disc6,
            &item.r2_disc7,
            &item.r2_disc8,
            &item.r2_disc9,
            &item.r2_disc10,
            &item.r2_disc_id,
            &item.sp_price,
            &item.sp_disc1,
            &item.sp_disc2,
            &item.sp_disc3,
            &item.sp_disc4,
            &item.sp_disc5,
            &item.sp_disc6,
            &item.sp_disc7,
            &item.sp_disc8,
            &item.sp_disc9,
            &item.sp_disc10,
            &item.sp_disc_id,
            &item.p_unit_price,
            &item.p_disc1,
            &item.p_disc2,
            &item.p_disc3,
            &item.p_disc4,
            &item.p_disc5,
            &item.p_disc6,
            &item.p_disc7,
            &item.p_disc8,
            &item.p_disc9,
            &item.p_disc10,
            &item.p_disc_id,
            &item.purchase_price,
            &item.retail_price,
            &item.category_id,
            &item.reorder_level,
            &item.is_discontinued,
            &item.on_s_order,
            &item.on_p_order,
            &item.supplier_id,
            &item.average_cost,
            &item.photo_file,
            &item.is_edited,
            &item.is_reorder_active,
            &item.item_commission,
            &item.p_term_code,
            &item.pack,
            &item.is_inventory_adjust,
            &item.item_location_id,
            &item.temp_average_cost,
            &item.is_kit,
            &item.term_code,
        ],
    ).await?.into_row().await?.context("Item inserted, but no record is returned")?;
    item_from_row(row)
}

/// Retrieves an item from the database given its unique id.
/// 
/// 

pub async fn get_item_by_id(pool: &Pool, id: i32) -> anyhow::Result<Option<Item>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let row = client
        .query(
            r#"
        SELECT
            ItemCode, ItemName, Remarks, ItemGroupId, UnitsInStock,
            ReturnStocks, UnitCode, BasePrice, SDisc1, SDisc2,
            SDisc3, SDisc4, SDisc5, SDisc6, SDisc7,
            SDisc8, SDisc9, SDisc10, SDiscId, SellingPrice,
            R1Price, R1Disc1, R1Disc2, R1Disc3, R1Disc4,
            R1Disc5, R1Disc6, R1Disc7, R1Disc8, R1Disc9,
            R1Disc10, R1DiscId, R1SPrice, R2Price, R2Disc1,
            R2Disc2, R2Disc3, R2Disc4, R2Disc5, R2Disc6,
            R2Disc7, R2Disc8, R2Disc9, R2Disc10, R2DiscId,
            SPPrice, SPDisc1, SPDisc2, SPDisc3, SPDisc4,
            SPDisc5, SPDisc6, SPDisc7, SPDisc8, SPDisc9,
            SPDisc10, SPDiscId, PUnitPrice, PDisc1, PDisc2,
            PDisc3, PDisc4, PDisc5, PDisc6, PDisc7,
            PDisc8, PDisc9, PDisc10, PDiscId, PurchasePrice,
            RetailPrice, CategoryId, ReorderLevel, isDiscontinued, OnSOrder,
            OnPOrder, SupplierId, AverageCost, PhotoFile, isEdited,
            isReorderActive, ItemCommission, PTermCode, Pack, isInventoryAdjust,
            ItemLocationId, TempAverageCost, isKit, TermCode
        FROM dbo.Items
        WHERE ItemCode = @P1;
        "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;
    row.map(item_from_row).transpose()
}

/// Retrieves every item ordered by its identity key, including discontinued items.
pub async fn get_all_items(pool: &Pool) -> anyhow::Result<Vec<Item>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let rows = client
        .query(
            r#"
        SELECT
            ItemCode, ItemName, Remarks, ItemGroupId, UnitsInStock,
            ReturnStocks, UnitCode, BasePrice, SDisc1, SDisc2,
            SDisc3, SDisc4, SDisc5, SDisc6, SDisc7,
            SDisc8, SDisc9, SDisc10, SDiscId, SellingPrice,
            R1Price, R1Disc1, R1Disc2, R1Disc3, R1Disc4,
            R1Disc5, R1Disc6, R1Disc7, R1Disc8, R1Disc9,
            R1Disc10, R1DiscId, R1SPrice, R2Price, R2Disc1,
            R2Disc2, R2Disc3, R2Disc4, R2Disc5, R2Disc6,
            R2Disc7, R2Disc8, R2Disc9, R2Disc10, R2DiscId,
            SPPrice, SPDisc1, SPDisc2, SPDisc3, SPDisc4,
            SPDisc5, SPDisc6, SPDisc7, SPDisc8, SPDisc9,
            SPDisc10, SPDiscId, PUnitPrice, PDisc1, PDisc2,
            PDisc3, PDisc4, PDisc5, PDisc6, PDisc7,
            PDisc8, PDisc9, PDisc10, PDiscId, PurchasePrice,
            RetailPrice, CategoryId, ReorderLevel, isDiscontinued, OnSOrder,
            OnPOrder, SupplierId, AverageCost, PhotoFile, isEdited,
            isReorderActive, ItemCommission, PTermCode, Pack, isInventoryAdjust,
            ItemLocationId, TempAverageCost, isKit, TermCode
        FROM dbo.Items
        ORDER BY ItemCode;
        "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;
    rows.into_iter().map(item_from_row).collect()
}


pub async fn update_item(pool: &Pool, id: i32, item: UpdateItem) -> anyhow::Result<Option<Item>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let row = client.query(
        r#"
        UPDATE dbo.Items
        SET
            ItemName = @P1,
            Remarks = @P2,
            ItemGroupId = @P3,
            UnitsInStock = @P4,
            ReturnStocks = @P5,
            UnitCode = @P6,
            BasePrice = @P7,
            SDisc1 = @P8,
            SDisc2 = @P9,
            SDisc3 = @P10,
            SDisc4 = @P11,
            SDisc5 = @P12,
            SDisc6 = @P13,
            SDisc7 = @P14,
            SDisc8 = @P15,
            SDisc9 = @P16,
            SDisc10 = @P17,
            SDiscId = @P18,
            SellingPrice = @P19,
            R1Price = @P20,
            R1Disc1 = @P21,
            R1Disc2 = @P22,
            R1Disc3 = @P23,
            R1Disc4 = @P24,
            R1Disc5 = @P25,
            R1Disc6 = @P26,
            R1Disc7 = @P27,
            R1Disc8 = @P28,
            R1Disc9 = @P29,
            R1Disc10 = @P30,
            R1DiscId = @P31,
            R1SPrice = @P32,
            R2Price = @P33,
            R2Disc1 = @P34,
            R2Disc2 = @P35,
            R2Disc3 = @P36,
            R2Disc4 = @P37,
            R2Disc5 = @P38,
            R2Disc6 = @P39,
            R2Disc7 = @P40,
            R2Disc8 = @P41,
            R2Disc9 = @P42,
            R2Disc10 = @P43,
            R2DiscId = @P44,
            SPPrice = @P45,
            SPDisc1 = @P46,
            SPDisc2 = @P47,
            SPDisc3 = @P48,
            SPDisc4 = @P49,
            SPDisc5 = @P50,
            SPDisc6 = @P51,
            SPDisc7 = @P52,
            SPDisc8 = @P53,
            SPDisc9 = @P54,
            SPDisc10 = @P55,
            SPDiscId = @P56,
            PUnitPrice = @P57,
            PDisc1 = @P58,
            PDisc2 = @P59,
            PDisc3 = @P60,
            PDisc4 = @P61,
            PDisc5 = @P62,
            PDisc6 = @P63,
            PDisc7 = @P64,
            PDisc8 = @P65,
            PDisc9 = @P66,
            PDisc10 = @P67,
            PDiscId = @P68,
            PurchasePrice = @P69,
            RetailPrice = @P70,
            CategoryId = @P71,
            ReorderLevel = @P72,
            isDiscontinued = @P73,
            OnSOrder = @P74,
            OnPOrder = @P75,
            SupplierId = @P76,
            AverageCost = @P77,
            PhotoFile = @P78,
            isEdited = @P79,
            isReorderActive = @P80,
            ItemCommission = @P81,
            PTermCode = @P82,
            Pack = @P83,
            isInventoryAdjust = @P84,
            ItemLocationId = @P85,
            TempAverageCost = @P86,
            isKit = @P87,
            TermCode = @P88
        OUTPUT
            INSERTED.ItemCode, INSERTED.ItemName, INSERTED.Remarks, INSERTED.ItemGroupId, INSERTED.UnitsInStock,
            INSERTED.ReturnStocks, INSERTED.UnitCode, INSERTED.BasePrice, INSERTED.SDisc1, INSERTED.SDisc2,
            INSERTED.SDisc3, INSERTED.SDisc4, INSERTED.SDisc5, INSERTED.SDisc6, INSERTED.SDisc7,
            INSERTED.SDisc8, INSERTED.SDisc9, INSERTED.SDisc10, INSERTED.SDiscId, INSERTED.SellingPrice,
            INSERTED.R1Price, INSERTED.R1Disc1, INSERTED.R1Disc2, INSERTED.R1Disc3, INSERTED.R1Disc4,
            INSERTED.R1Disc5, INSERTED.R1Disc6, INSERTED.R1Disc7, INSERTED.R1Disc8, INSERTED.R1Disc9,
            INSERTED.R1Disc10, INSERTED.R1DiscId, INSERTED.R1SPrice, INSERTED.R2Price, INSERTED.R2Disc1,
            INSERTED.R2Disc2, INSERTED.R2Disc3, INSERTED.R2Disc4, INSERTED.R2Disc5, INSERTED.R2Disc6,
            INSERTED.R2Disc7, INSERTED.R2Disc8, INSERTED.R2Disc9, INSERTED.R2Disc10, INSERTED.R2DiscId,
            INSERTED.SPPrice, INSERTED.SPDisc1, INSERTED.SPDisc2, INSERTED.SPDisc3, INSERTED.SPDisc4,
            INSERTED.SPDisc5, INSERTED.SPDisc6, INSERTED.SPDisc7, INSERTED.SPDisc8, INSERTED.SPDisc9,
            INSERTED.SPDisc10, INSERTED.SPDiscId, INSERTED.PUnitPrice, INSERTED.PDisc1, INSERTED.PDisc2,
            INSERTED.PDisc3, INSERTED.PDisc4, INSERTED.PDisc5, INSERTED.PDisc6, INSERTED.PDisc7,
            INSERTED.PDisc8, INSERTED.PDisc9, INSERTED.PDisc10, INSERTED.PDiscId, INSERTED.PurchasePrice,
            INSERTED.RetailPrice, INSERTED.CategoryId, INSERTED.ReorderLevel, INSERTED.isDiscontinued, INSERTED.OnSOrder,
            INSERTED.OnPOrder, INSERTED.SupplierId, INSERTED.AverageCost, INSERTED.PhotoFile, INSERTED.isEdited,
            INSERTED.isReorderActive, INSERTED.ItemCommission, INSERTED.PTermCode, INSERTED.Pack, INSERTED.isInventoryAdjust,
            INSERTED.ItemLocationId, INSERTED.TempAverageCost, INSERTED.isKit, INSERTED.TermCode
        WHERE ItemCode = @P89;
        "#,
        &[
            &item.item_name,
            &item.remarks,
            &item.item_group_id,
            &item.units_in_stock,
            &item.return_stocks,
            &item.unit_code,
            &item.base_price,
            &item.s_disc1,
            &item.s_disc2,
            &item.s_disc3,
            &item.s_disc4,
            &item.s_disc5,
            &item.s_disc6,
            &item.s_disc7,
            &item.s_disc8,
            &item.s_disc9,
            &item.s_disc10,
            &item.s_disc_id,
            &item.selling_price,
            &item.r1_price,
            &item.r1_disc1,
            &item.r1_disc2,
            &item.r1_disc3,
            &item.r1_disc4,
            &item.r1_disc5,
            &item.r1_disc6,
            &item.r1_disc7,
            &item.r1_disc8,
            &item.r1_disc9,
            &item.r1_disc10,
            &item.r1_disc_id,
            &item.r1_s_price,
            &item.r2_price,
            &item.r2_disc1,
            &item.r2_disc2,
            &item.r2_disc3,
            &item.r2_disc4,
            &item.r2_disc5,
            &item.r2_disc6,
            &item.r2_disc7,
            &item.r2_disc8,
            &item.r2_disc9,
            &item.r2_disc10,
            &item.r2_disc_id,
            &item.sp_price,
            &item.sp_disc1,
            &item.sp_disc2,
            &item.sp_disc3,
            &item.sp_disc4,
            &item.sp_disc5,
            &item.sp_disc6,
            &item.sp_disc7,
            &item.sp_disc8,
            &item.sp_disc9,
            &item.sp_disc10,
            &item.sp_disc_id,
            &item.p_unit_price,
            &item.p_disc1,
            &item.p_disc2,
            &item.p_disc3,
            &item.p_disc4,
            &item.p_disc5,
            &item.p_disc6,
            &item.p_disc7,
            &item.p_disc8,
            &item.p_disc9,
            &item.p_disc10,
            &item.p_disc_id,
            &item.purchase_price,
            &item.retail_price,
            &item.category_id,
            &item.reorder_level,
            &item.is_discontinued,
            &item.on_s_order,
            &item.on_p_order,
            &item.supplier_id,
            &item.average_cost,
            &item.photo_file,
            &item.is_edited,
            &item.is_reorder_active,
            &item.item_commission,
            &item.p_term_code,
            &item.pack,
            &item.is_inventory_adjust,
            &item.item_location_id,
            &item.temp_average_cost,
            &item.is_kit,
            &item.term_code,
            &id,
        ],
    ).await?.into_row().await?;
    row.map(item_from_row).transpose()
}

/// Hard-deletes an item. Related records may prevent deletion via foreign keys.
/// 
/// 

pub async fn delete_item_by_id(pool: &Pool, id: i32) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let result = client
        .execute("DELETE FROM dbo.Items WHERE ItemCode = @P1;", &[&id])
        .await
        .context("Failed to delete item.")?;
    Ok(result.total() > 0)
}
