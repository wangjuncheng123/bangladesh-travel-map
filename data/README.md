# 孟加拉国景点数据集

- 核实日期：2026-07-11
- 记录数：122
- 字段数：26
- 覆盖：孟加拉国全部 8 个 Division
- 已填写坐标：86 条（70.5%）
- 景点级权威来源：31 条

## 文件

- `bangladesh_attractions.xlsx`：项目使用版，包含“景点数据”“字段说明”“范围与限制”三个工作表。
- `bangladesh_attractions.csv`：UTF-8 with BOM，适合导入数据库、GIS 或前端项目。

## 数据边界

这是基于公开资料整理的重点景点与保护地清单，不是法律意义或实时意义上的穷尽名录。主要来源包括 Bangladesh Tourism Board、UNESCO World Heritage Centre、Bangladesh Forest Department、Ramsar Sites Information Service、Wikidata 和 OpenStreetMap。

自动匹配的坐标均在 `verification_status` 中标为“待人工复核”。36 条未能可靠确认坐标的记录保持空白。门票、开放时间、电话、官网等高时效字段在没有可靠当前资料时也保持空白，未进行猜测。

## 上线前建议

1. 人工抽查全部自动坐标，尤其是同名宗教建筑、跨行政区景点和大范围自然景观。
2. 向景区主管部门复核开放时间、票价、预约、山区许可和季节性通行情况。
3. 若项目需要“全量名录”，应继续接入各 District/Upazila 政府旅游目录，并建立定期增量更新流程。
