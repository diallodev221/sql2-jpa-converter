package com.diallodev.sql2jpa.controller;

import com.diallodev.sql2jpa.model.ColumnInfo;
import com.diallodev.sql2jpa.service.SqlParserService;
import com.diallodev.sql2jpa.generator.JpaEntityGenerator;

import net.sf.jsqlparser.statement.create.table.CreateTable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/convert")
public class SqlToJpaController {

    private final SqlParserService sqlParserService;
    private final JpaEntityGenerator jpaEntityGenerator;

    public SqlToJpaController(SqlParserService sqlParserService, JpaEntityGenerator jpaEntityGenerator) {
        this.sqlParserService = sqlParserService;
        this.jpaEntityGenerator = jpaEntityGenerator;
    }

    @PostMapping
    public List<EntityResponse> convert(@RequestBody SqlRequest sqlSchema) {
        if (sqlSchema.sql() == null || sqlSchema.sql().isEmpty()) {
            throw new IllegalArgumentException("SQL schema is required");
        }

        return sqlParserService.parseSQL(sqlSchema.sql())
                .stream()
                .map(tableInfo -> {
                    String entityCode = jpaEntityGenerator.generateEntity(tableInfo.getTableName(), tableInfo.getColumns());
                    return new EntityResponse(tableInfo.getTableName(), entityCode);
                })
                .toList();
    }

    record SqlRequest(String sql) {}

    record EntityResponse(String tableName, String entityCode) {}
}
