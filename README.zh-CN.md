# china-antique-maplibre

[English](README.md) | **中文**

面向中国历史地图与短视频制作的开源 **古卷羊皮纸** MapLibre 方案（HyperFrames 或其他 MapLibre 宿主均可）。

## 在线演示

**交互调参器：** https://hopechen067.github.io/china-antique-maplibre/  
（EOX 卫星底图 + Terrarium 山影需联网。无需安装。）

## 效果展示

《河西走廊 · 河西四郡》(ep.07) 地图镜头静帧，以及调参器截图。

<table>
  <tr>
    <td align="center" width="50%">
      <img src="showcases/hexi-ep07/still-01-open.jpg" alt="武威 · 绿洲与石羊河" />
      <br /><sub>武威 · 绿洲 / 石羊河</sub>
    </td>
    <td align="center" width="50%">
      <img src="showcases/hexi-ep07/still-03-commanderies.jpg" alt="酒泉 · 地形与水系" />
      <br /><sub>酒泉 · 地形 + 水系</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="showcases/hexi-ep07/still-02-corridor.jpg" alt="走廊视角" />
      <br /><sub>河西走廊地图镜头</sub>
    </td>
    <td align="center" width="50%">
      <img src="showcases/hexi-ep07/still-05-close.jpg" alt="近景城站" />
      <br /><sub>城站近景</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="showcases/preview-eox-china.png" alt="调参器全国视角" />
      <br /><sub>调参器 · 全国视角 (EOX)</sub>
    </td>
    <td align="center" width="50%">
      <img src="showcases/preview-eox-hexi.png" alt="调参器河西视角" />
      <br /><sub>调参器 · 河西 / 山影</sub>
    </td>
  </tr>
</table>

更多文件：[showcases/hexi-ep07/](showcases/hexi-ep07/)

| 项目 | 说明 |
|------|------|
| Skill 目录 | `china-antique-maplibre` |
| 运行时 | [MapLibre GL JS](https://maplibre.org/) |
| 默认底图 | **EOX Sentinel-2 cloudless**（公开演示 WMTS，请自行遵守图源条款） |
| 地形 / 山影 | AWS Terrarium DEM（运行时拉取；必须 `encoding: 'terrarium'`） |
| 水系 | `tuner/assets/water-data.js` — **不在 MIT 内**；见 [DATA-PROVENANCE.md](DATA-PROVENANCE.md) |
| 风格 | 古卷 CSS 调参 + 分级城池（`HanCity3D`） |
| 许可证 | 代码/文档 [MIT](LICENSE)；水系与展示媒体见 LICENSE 例外 |
| 在线演示 | GitHub Pages → `china-antique-maplibre/tuner` |

## 快速开始（本机调参）

```bash
cd china-antique-maplibre/tuner

# 方式 A — Python 3
python -m http.server 8765

# 方式 B — Node
npx --yes serve -l 8765
```

服务启动后在本机打开：`http://127.0.0.1:8765/`  
公网分享请用 [在线演示](#在线演示)。

**不要**用 `file://` 打开 `index.html`。

可选检查：

```bash
cd china-antique-maplibre/tuner
node verify.mjs
```

## 功能

- **可配置栅格底图** — 默认 [EOX Sentinel-2 cloudless](https://s2maps.eu)；其他源用 gitignore 的 `map-tiles.config.local.js`。
- **Terrarium 山影 + 地形** — 必须 `encoding: 'terrarium'`。
- **全国水系叠加** — 多级河流、湖泊、高亮水系（见 DATA-PROVENANCE.md）。
- **古卷 CSS 调参** — sepia / 暖调 / 暗角 / 画笔；导出 JSON 预设。
- **城池分级** — 都城 / 大城 / 中城 / 小城 / 关隘 / 驿站 / 都护等。

## 配置地图瓦片

1. 阅读 [NOTICE.md](NOTICE.md)。
2. 默认：`tuner/map-tiles.config.js`（EOX + Terrarium）。
3. 个人端点：`map-tiles.config.local.js`（不提交）。见 `map-tiles.config.example.js`。

EOX 公共瓦片多为非商用 + 需署名（约 10 m）。本项目不授予任何商业图商权利。

## 瓦片不随仓库打包

卫星与 DEM 仅在运行时按配置请求。

## 署名与合规

- 遵守所用底图 / DEM / CDN 条款。
- **水系数据：** 非 MIT — [DATA-PROVENANCE.md](DATA-PROVENANCE.md)。
- **MapLibre / Three.js：** 再分发时遵循其许可证。
- **展示图：** 默认保留权利的演示媒体（见 LICENSE 例外）。

## 安装为 Agent Skill

1. 将 `china-antique-maplibre` 复制到 skills 目录。  
2. 重载 skills，使 `SKILL.md` 生效。  
3. 让 agent 应用古卷地图栈、打开调参器或迁移导出预设。

## 目录结构

```
.
├── LICENSE
├── NOTICE.md
├── DATA-PROVENANCE.md
├── SECURITY.md
├── README.md / README.zh-CN.md
├── showcases/                 # 文档用截图与示例帧
└── china-antique-maplibre/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    ├── schemas/
    └── tuner/
```

## 贡献 / 安全

- 优先小而清晰的改动。  
- 勿提交 API key 或 `map-tiles.config.local.js`。  
- 见 [SECURITY.md](SECURITY.md)。

## 延伸阅读

- [`china-antique-maplibre/SKILL.md`](china-antique-maplibre/SKILL.md)  
- [`china-antique-maplibre/references/参数列表说明.md`](china-antique-maplibre/references/参数列表说明.md)  
- [`china-antique-maplibre/references/tuner-workflow.md`](china-antique-maplibre/references/tuner-workflow.md)  
- [`china-antique-maplibre/references/tested-config.md`](china-antique-maplibre/references/tested-config.md)  
