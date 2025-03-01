package com.diallodev.sql2jpa.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ColumnInfo {
    private String columnName;
    private String sqlType;
    private boolean isPrimaryKey;
}
