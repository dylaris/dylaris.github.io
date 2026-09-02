return {
  struct = {
    title = "string",
    status = { "todo", "doing", "done" },
    priority = "number",
    date = "string",
    tag = "string",
  },

  format = {
    brief = function(e)
      local prefix = ""
      if e.status == "todo" then
        prefix = _G.color.fg_lwhite
      elseif e.status == "done" then
        prefix = _G.color.fg_lgreen
      elseif e.status == "doing" then
        prefix = _G.color.fg_yellow
      else
        prefix = _G.color.reset
      end
      return prefix .. e.__id .. ": " .. e.priority .. " | " .. e.date .. " | " .. e.status .. " | " .. e.title .. _G.color.reset
    end
  },

  filter = {
    id = function(e, id)
      return e.__id == tonumber(id)
    end,

    status = function(e, status)
      return e.status == status
    end,

    today = function(e)
      local now = os.date("*t")
      local today_str = string.format("%04d-%02d-%02d", now.year, now.month, now.day)
      return e.date == today_str
    end,

    search = function(e, keyword)
      return e.title:lower():find(keyword:lower(), 1, true) ~= nil
    end,

    tag = function(e, tag)
      return e.tag == tag
    end,
  },

  sort = {
    date = function(a, b)
      return a.date > b.date
    end,

    priority = function(a, b)
      return a.priority > b.priority
    end,
  },

  foreach = {
    status = function(e, s)
      e.status = s
    end,

    title = function(e, s)
      e.title = e.title .. " + " .. s
    end
  },

  reduce = {
    count = function(es) print(#es) end,
  }
}
